/**
 * server.js — Infinity Coaching & Abacus Worksheet Generator
 * 
 * Express server with hardcoded branding.
 * Logo auto-loaded from assets/ folder.
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const TextProcessor = require('./textProcessor');
const { generateWorksheetPDF, generateAnswerKeyPDF } = require('./generatePDF');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Hardcoded Branding ──
const BRAND_NAME = 'Infinity Coaching and Abacus';

/** Find the logo file in the assets directory */
function findLogo() {
  const assetsDir = path.join(__dirname, 'assets');
  for (const ext of ['png', 'jpg', 'jpeg', 'webp']) {
    const p = path.join(assetsDir, `logo.${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// ── Middleware ──
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ── Logo serving endpoint ──
app.get('/api/logo', (req, res) => {
  const logoPath = findLogo();
  if (logoPath) {
    res.sendFile(logoPath);
  } else {
    res.status(404).json({ error: 'Logo not found. Place logo.png in the assets/ folder.' });
  }
});

// ── File Upload Config (PDF only) ──
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed.'));
    }
  }
});

const uploadPdf = upload.single('pdf');

// ══════════════════════════════════════════════
//  API Routes
// ══════════════════════════════════════════════

app.get('/api/health', (req, res) => {
  const logoFound = !!findLogo();
  res.json({ status: 'ok', brand: BRAND_NAME, logoFound });
});

app.post('/api/generate', (req, res) => {
  uploadPdf(req, res, async (uploadErr) => {
    let pdfPath = null;

    try {
      if (uploadErr) {
        if (uploadErr instanceof multer.MulterError && uploadErr.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File is too large. Maximum size is 15MB.' });
        }
        return res.status(400).json({ error: uploadErr.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Please upload a chapter PDF file.' });
      }

      pdfPath = req.file.path;
      const logoPath = findLogo();
      const classInfo = req.body.classInfo || '';
      const chapterName = req.body.chapterName || '';
      const includeAnswerKey = req.body.includeAnswerKey === 'true';

      console.log(`\n📄 Processing: ${req.file.originalname}`);
      console.log(`   Brand: ${BRAND_NAME}`);
      console.log(`   Logo: ${logoPath ? 'Found ✓' : 'Not found ✗'}`);
      console.log(`   Class: ${classInfo || '(none)'}`);
      console.log(`   Chapter: ${chapterName || '(none)'}`);

      // ── Step 1: Extract text ──
      console.log('   📖 Extracting text...');
      const pdfBuffer = fs.readFileSync(pdfPath);
      const pdfData = await pdfParse(pdfBuffer);
      const extractedText = pdfData.text;

      if (!extractedText || extractedText.trim().length < 100) {
        return res.status(400).json({
          error: 'Could not extract enough text from the PDF. Ensure it contains readable text (not scanned images).'
        });
      }

      console.log(`   ✅ Extracted ${extractedText.length} chars from ${pdfData.numpages} page(s)`);

      // ── Step 2: Generate questions ──
      console.log('   🧠 Generating questions...');
      const processor = new TextProcessor(extractedText);
      const worksheetData = processor.generateWorksheet();

      console.log(`   ✅ Generated:`);
      console.log(`      • Fill in Blanks: ${worksheetData.sectionA.questions.length}`);
      console.log(`      • True/False: ${worksheetData.sectionB.questions.length}`);
      console.log(`      • Match the Following: ${worksheetData.sectionC.data.pairs.length}`);
      console.log(`      • Short Answer: ${worksheetData.sectionD.questions.length}`);
      console.log(`      • Long Answer: ${worksheetData.sectionE.questions.length}`);

      // ── Step 3: Generate PDFs ──
      const pdfOpts = { logoPath, title: BRAND_NAME, classInfo, chapterName };

      console.log('   📝 Generating worksheet PDF...');
      const worksheetBuffer = await generateWorksheetPDF(worksheetData, pdfOpts);

      let answerKeyBuffer = null;
      if (includeAnswerKey) {
        console.log('   📋 Generating answer key PDF...');
        answerKeyBuffer = await generateAnswerKeyPDF(worksheetData, pdfOpts);
      }

      console.log('   ✅ Done!\n');

      // ── Step 4: Respond ──
      const safeTitle = BRAND_NAME.replace(/\s+/g, '_');
      if (includeAnswerKey && answerKeyBuffer) {
        res.json({
          success: true,
          worksheet: {
            filename: `${safeTitle}_Worksheet.pdf`,
            data: worksheetBuffer.toString('base64'),
          },
          answerKey: {
            filename: `${safeTitle}_Answer_Key.pdf`,
            data: answerKeyBuffer.toString('base64'),
          },
          stats: {
            fillInBlanks: worksheetData.sectionA.questions.length,
            trueFalse: worksheetData.sectionB.questions.length,
            matchFollowing: worksheetData.sectionC.data.pairs.length,
            shortAnswer: worksheetData.sectionD.questions.length,
            longAnswer: worksheetData.sectionE.questions.length,
            pagesExtracted: pdfData.numpages,
            charactersProcessed: extractedText.length,
          }
        });
      } else {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}_Worksheet.pdf"`);
        res.send(worksheetBuffer);
      }

    } catch (err) {
      console.error('❌ Error:', err);
      res.status(500).json({ error: 'Failed to generate worksheet. Please try again.' });
    } finally {
      // Cleanup uploaded PDF
      if (pdfPath) {
        setTimeout(() => {
          try { if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath); } catch (e) {}
        }, 2000);
      }
    }
  });
});

// ── Error handling ──
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'An unexpected error occurred.' });
});

// ── Start ──
app.listen(PORT, () => {
  const logoStatus = findLogo() ? '✅ Logo found' : '⚠️  No logo — place logo.png in assets/';
  console.log(`\n╔══════════════════════════════════════════════════════╗`);
  console.log(`║   📝 ${BRAND_NAME} — Worksheet Generator   ║`);
  console.log(`║   🌐 http://localhost:${PORT}                              ║`);
  console.log(`║   🖼️  ${logoStatus.padEnd(42)}║`);
  console.log(`╚══════════════════════════════════════════════════════╝\n`);
});
