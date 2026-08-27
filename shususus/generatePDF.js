/**
 * generatePDF.js — Infinity Coaching and Abacus Worksheet PDF Generator
 * 
 * Produces branded PDFs with:
 *  - Logo in top-left corner
 *  - Title: Coaching Name → Chapter → "Worksheet"
 *  - Logo watermark on every page
 *  - Questions only (no answer spaces)
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');

// ═══════════════════════════════════════════
//  Design Tokens
// ═══════════════════════════════════════════

const COLORS = {
  primary: '#1a5276',
  heading: '#1a5276',
  chapterGreen: '#27ae60',
  chapterBg: '#f5f6f7',
  dividerBlue: '#2e86c1',
  text: '#2c3e50',
  lightText: '#7f8c8d',
  sectionBorder: '#d5d8dc',
  white: '#ffffff',
};

const MARGINS = { top: 45, bottom: 50, left: 60, right: 60 };

// ═══════════════════════════════════════════
//  Helpers
// ═══════════════════════════════════════════

function pageWidth(doc) {
  return doc.page.width - MARGINS.left - MARGINS.right;
}

function checkPageBreak(doc, needed) {
  if (doc.y + needed > doc.page.height - MARGINS.bottom) {
    doc.addPage();
  }
}

/** Draw the logo in the top-left corner */
function drawCornerLogo(doc, logoPath, size = 65) {
  if (!logoPath || !fs.existsSync(logoPath)) return;
  try {
    doc.image(logoPath, MARGINS.left, MARGINS.top, {
      width: size,
      fit: [size, size],
    });
  } catch (e) {
    // skip if logo fails
  }
}

/** Draw thick blue horizontal rule */
function drawBlueRule(doc) {
  const pw = pageWidth(doc);
  const y = doc.y;
  doc.moveTo(MARGINS.left, y)
    .lineTo(MARGINS.left + pw, y)
    .lineWidth(3)
    .strokeColor(COLORS.dividerBlue)
    .stroke();
  doc.y = y + 12;
}

/** Draw thin section underline */
function drawSectionLine(doc) {
  const pw = pageWidth(doc);
  const y = doc.y;
  doc.moveTo(MARGINS.left, y)
    .lineTo(MARGINS.left + pw, y)
    .lineWidth(0.5)
    .strokeColor(COLORS.sectionBorder)
    .stroke();
  doc.y = y + 8;
}

/** Draw chapter heading with green left border */
function drawChapterHeading(doc, chapterName) {
  if (!chapterName) return;
  checkPageBreak(doc, 40);

  const pw = pageWidth(doc);
  const y = doc.y;
  const height = 32;
  const barWidth = 5;

  doc.save();
  doc.rect(MARGINS.left, y, pw, height).fill(COLORS.chapterBg);
  doc.rect(MARGINS.left, y, barWidth, height).fill(COLORS.chapterGreen);
  doc.restore();

  doc.fontSize(14)
    .font('Helvetica-Bold')
    .fillColor(COLORS.text)
    .text(chapterName, MARGINS.left + barWidth + 12, y + 8, {
      width: pw - barWidth - 24,
    });

  doc.y = y + height + 14;
}

/** Draw a section title */
function drawSectionTitle(doc, title) {
  checkPageBreak(doc, 35);
  doc.fontSize(12)
    .font('Helvetica-Bold')
    .fillColor(COLORS.heading)
    .text(title, MARGINS.left, doc.y, { width: pageWidth(doc) });
  doc.moveDown(0.25);
  drawSectionLine(doc);
}

/** Add logo watermark to every page */
function addWatermark(doc, logoPath) {
  if (!logoPath || !fs.existsSync(logoPath)) return;
  try {
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(range.start + i);
      doc.save();
      doc.opacity(0.06);
      const wmW = 250;
      const wmX = (doc.page.width - wmW) / 2;
      const wmY = (doc.page.height - wmW) / 2;
      doc.image(logoPath, wmX, wmY, { width: wmW });
      doc.restore();
    }
  } catch (e) {
    // watermark is optional
  }
}

/** Add page numbers to every page */
function addPageNumbers(doc) {
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    doc.fontSize(8)
      .font('Helvetica')
      .fillColor(COLORS.lightText)
      .text(
        `Page ${i + 1} of ${range.count}`,
        MARGINS.left,
        doc.page.height - MARGINS.bottom + 18,
        { width: pageWidth(doc), align: 'center' }
      );
  }
}

/**
 * Draw the header block:
 *  - Logo in top-left corner
 *  - Line 1: INFINITY COACHING AND ABACUS (all caps)
 *  - Line 2: Class info + Chapter name combined (e.g. Class 7 English Literature: "The Day the River Spoke")
 *  - Blue divider
 */
function drawHeader(doc, logoPath, title, classInfo, chapterName) {
  const pw = pageWidth(doc);

  // Logo in top-left corner
  drawCornerLogo(doc, logoPath, 65);

  const textX = MARGINS.left;
  const textW = pw;

  // Line 1: Brand name — ALL CAPS, large, centered
  doc.y = MARGINS.top + 8;
  doc.fontSize(18)
    .font('Helvetica-Bold')
    .fillColor(COLORS.primary)
    .text(title.toUpperCase(), textX, doc.y, { width: textW, align: 'center', characterSpacing: 2 });
  doc.moveDown(0.35);

  // Line 2: Class + Chapter combined
  // e.g. "Class 7 English Literature: \"The Day the River Spoke\""
  let subtitle = '';
  if (classInfo && chapterName) {
    subtitle = `${classInfo}: "${chapterName}"`;
  } else if (classInfo) {
    subtitle = classInfo;
  } else if (chapterName) {
    subtitle = chapterName;
  }

  if (subtitle) {
    doc.fontSize(12)
      .font('Helvetica')
      .fillColor(COLORS.text)
      .text(subtitle, textX, doc.y, { width: textW, align: 'center' });
    doc.moveDown(0.4);
  }

  // Ensure we're below the logo
  if (doc.y < MARGINS.top + 75) {
    doc.y = MARGINS.top + 75;
  }

  drawBlueRule(doc);
  doc.moveDown(0.3);
}

// ═══════════════════════════════════════════════════
//  WORKSHEET PDF (Questions only — no answer spaces)
// ═══════════════════════════════════════════════════

function generateWorksheetPDF(worksheetData, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const {
        logoPath,
        title = 'Infinity Coaching and Abacus',
        classInfo = '',
        chapterName = '',
      } = options;

      const doc = new PDFDocument({
        size: 'A4',
        margins: MARGINS,
        bufferPages: true,
        info: {
          Title: `${title} - ${chapterName || 'Worksheet'}`,
          Author: title,
          Creator: 'Worksheet Generator',
        },
      });

      const buffers = [];
      doc.on('data', (c) => buffers.push(c));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      const pw = pageWidth(doc);

      // ── Header ──
      drawHeader(doc, logoPath, title, classInfo, chapterName);

      // ═════════════════════════════════════
      //  Section A — Fill in the Blanks
      // ═════════════════════════════════════
      const secA = worksheetData.sectionA;
      if (secA && secA.questions.length > 0) {
        drawSectionTitle(doc, 'Section A: Fill in the Blanks');
        secA.questions.forEach((q, i) => {
          checkPageBreak(doc, 20);
          doc.fontSize(10.5)
            .font('Helvetica')
            .fillColor(COLORS.text)
            .text(`${i + 1}. ${q.question}`, MARGINS.left + 5, doc.y, { width: pw - 10 });
          doc.moveDown(0.3);
        });
        doc.moveDown(0.6);
      }

      // ═════════════════════════════════════
      //  Section B — True or False
      // ═════════════════════════════════════
      const secB = worksheetData.sectionB;
      if (secB && secB.questions.length > 0) {
        drawSectionTitle(doc, 'Section B: True or False');
        secB.questions.forEach((q, i) => {
          checkPageBreak(doc, 20);
          doc.fontSize(10.5)
            .font('Helvetica')
            .fillColor(COLORS.text)
            .text(`${i + 1}. ${q.statement}`, MARGINS.left + 5, doc.y, { width: pw - 10 });
          doc.moveDown(0.3);
        });
        doc.moveDown(0.6);
      }

      // ═════════════════════════════════════
      //  Section C — Match the Following
      // ═════════════════════════════════════
      const secC = worksheetData.sectionC;
      if (secC && secC.data) {
        drawSectionTitle(doc, 'Section C: Match the Following');
        checkPageBreak(doc, 100);

        const colA = pw * 0.42;
        const gap = pw * 0.16;
        const startX = MARGINS.left + 5;

        // Column headers
        doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLORS.heading);
        const hY = doc.y;
        doc.text('Column A', startX, hY, { width: colA });
        doc.text('Column B', startX + colA + gap, hY, { width: colA });
        doc.moveDown(0.2);

        const lineY = doc.y;
        doc.moveTo(startX, lineY).lineTo(startX + pw - 10, lineY)
          .lineWidth(0.4).strokeColor(COLORS.sectionBorder).stroke();
        doc.moveDown(0.4);

        const pairs = secC.data.pairs;
        const shuffled = secC.data.shuffledRight;
        for (let i = 0; i < pairs.length; i++) {
          checkPageBreak(doc, 20);
          const rY = doc.y;
          doc.fontSize(10.5).font('Helvetica').fillColor(COLORS.text);
          doc.text(`${i + 1}. ${pairs[i].left}`, startX, rY, { width: colA });
          const lbl = String.fromCharCode(97 + i);
          doc.text(`${lbl}) ${shuffled[i] || ''}`, startX + colA + gap, rY, { width: colA });
          doc.moveDown(0.35);
        }
        doc.moveDown(0.6);
      }

      // ═════════════════════════════════════
      //  Section D — Short Answer
      // ═════════════════════════════════════
      const secD = worksheetData.sectionD;
      if (secD && secD.questions.length > 0) {
        drawSectionTitle(doc, 'Section D: Short Answer Questions');
        secD.questions.forEach((q, i) => {
          checkPageBreak(doc, 20);
          doc.fontSize(10.5).font('Helvetica').fillColor(COLORS.text)
            .text(`${i + 1}. ${q.question}`, MARGINS.left + 5, doc.y, { width: pw - 10 });
          doc.moveDown(0.3);
        });
        doc.moveDown(0.6);
      }

      // ═════════════════════════════════════
      //  Section E — Long Answer
      // ═════════════════════════════════════
      const secE = worksheetData.sectionE;
      if (secE && secE.questions.length > 0) {
        drawSectionTitle(doc, 'Section E: Long Answer Questions');
        secE.questions.forEach((q, i) => {
          checkPageBreak(doc, 20);
          doc.fontSize(10.5).font('Helvetica').fillColor(COLORS.text)
            .text(`${i + 1}. ${q.question}`, MARGINS.left + 5, doc.y, { width: pw - 10 });
          doc.moveDown(0.3);
        });
      }

      // ── Watermark + page numbers ──
      addWatermark(doc, logoPath);
      addPageNumbers(doc);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ═══════════════════════════════════════════════════
//  MASTER ANSWER KEY PDF
// ═══════════════════════════════════════════════════

function generateAnswerKeyPDF(worksheetData, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const {
        logoPath,
        title = 'Infinity Coaching and Abacus',
        classInfo = '',
        chapterName = '',
      } = options;

      const doc = new PDFDocument({
        size: 'A4',
        margins: MARGINS,
        bufferPages: true,
        info: {
          Title: `${title} - Master Answer Key`,
          Author: title,
        },
      });

      const buffers = [];
      doc.on('data', (c) => buffers.push(c));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      const pw = pageWidth(doc);

      // ── Header ──
      drawHeader(doc, logoPath, title, classInfo, chapterName);

      // ═══ Section A answers ═══
      const secA = worksheetData.sectionA;
      if (secA && secA.questions.length > 0) {
        drawSectionTitle(doc, 'Section A: Fill in the Blanks');
        secA.questions.forEach((q, i) => {
          checkPageBreak(doc, 18);
          doc.fontSize(10.5)
            .font('Helvetica')
            .fillColor(COLORS.text)
            .text(`${i + 1}. ${q.answer}`, MARGINS.left + 5, doc.y, { width: pw - 10 });
          doc.moveDown(0.2);
        });
        doc.moveDown(0.7);
      }

      // ═══ Section B answers ═══
      const secB = worksheetData.sectionB;
      if (secB && secB.questions.length > 0) {
        drawSectionTitle(doc, 'Section B: True or False');
        secB.questions.forEach((q, i) => {
          checkPageBreak(doc, 18);
          doc.fontSize(10.5)
            .font('Helvetica')
            .fillColor(COLORS.text)
            .text(`${i + 1}. ${q.answer}`, MARGINS.left + 5, doc.y, { width: pw - 10 });
          doc.moveDown(0.2);
        });
        doc.moveDown(0.7);
      }

      // ═══ Section C answers ═══
      const secC = worksheetData.sectionC;
      if (secC && secC.data) {
        drawSectionTitle(doc, 'Section C: Match the Following');
        const pairs = secC.data.pairs;
        const shuffled = secC.data.shuffledRight;
        pairs.forEach((pair, i) => {
          checkPageBreak(doc, 18);
          const idx = shuffled.indexOf(pair.right);
          const lbl = idx >= 0 ? String.fromCharCode(97 + idx) : '?';
          doc.fontSize(10.5)
            .font('Helvetica')
            .fillColor(COLORS.text)
            .text(`${i + 1}. → ${lbl}) ${pair.right}`, MARGINS.left + 5, doc.y, { width: pw - 10 });
          doc.moveDown(0.2);
        });
        doc.moveDown(0.7);
      }

      // ═══ Section D answers ═══
      const secD = worksheetData.sectionD;
      if (secD && secD.questions.length > 0) {
        drawSectionTitle(doc, 'Section D: Short Answer Questions');
        doc.fontSize(9)
          .font('Helvetica-Oblique')
          .fillColor(COLORS.lightText)
          .text('(Answers may vary. Key points to look for:)', MARGINS.left + 5, doc.y);
        doc.moveDown(0.3);
        secD.questions.forEach((q, i) => {
          checkPageBreak(doc, 22);
          doc.fontSize(10.5)
            .font('Helvetica')
            .fillColor(COLORS.text)
            .text(`${i + 1}. ${q.question}`, MARGINS.left + 5, doc.y, { width: pw - 10 });
          doc.moveDown(0.2);
        });
        doc.moveDown(0.7);
      }

      // ═══ Section E answers ═══
      const secE = worksheetData.sectionE;
      if (secE && secE.questions.length > 0) {
        drawSectionTitle(doc, 'Section E: Long Answer Questions');
        doc.fontSize(9)
          .font('Helvetica-Oblique')
          .fillColor(COLORS.lightText)
          .text('(Answers may vary. Key points to look for:)', MARGINS.left + 5, doc.y);
        doc.moveDown(0.3);
        secE.questions.forEach((q, i) => {
          checkPageBreak(doc, 22);
          doc.fontSize(10.5)
            .font('Helvetica')
            .fillColor(COLORS.text)
            .text(`${i + 1}. ${q.question}`, MARGINS.left + 5, doc.y, { width: pw - 10 });
          doc.moveDown(0.2);
        });
      }

      // ── Watermark + page numbers ──
      addWatermark(doc, logoPath);
      addPageNumbers(doc);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateWorksheetPDF, generateAnswerKeyPDF };
