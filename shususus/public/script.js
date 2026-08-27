/**
 * script.js — Infinity Coaching Worksheet Generator Frontend
 * 
 * Handles PDF upload, form submission, progress animation,
 * and PDF downloads. Logo is auto-loaded from server assets.
 */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const elements = {
  form: $('#worksheet-form'),
  generateBtn: $('#generate-btn'),
  btnContent: $('#btn-content'),
  btnLoading: $('#btn-loading'),

  // PDF upload
  pdfDropzone: $('#pdf-dropzone'),
  pdfInput: $('#pdf-input'),
  pdfPreview: $('#pdf-preview'),
  pdfName: $('#pdf-name'),
  pdfSize: $('#pdf-size'),
  pdfRemove: $('#pdf-remove'),

  // Settings
  classInfoInput: $('#class-info-input'),
  chapterInput: $('#chapter-input'),
  answerKeyToggle: $('#answer-key-toggle'),

  // Progress
  progressSection: $('#progress-section'),
  progressBar: $('#progress-bar'),
  steps: {
    extract: $('#step-extract'),
    analyze: $('#step-analyze'),
    generate: $('#step-generate'),
    pdf: $('#step-pdf'),
  },

  // Results
  resultsSection: $('#results-section'),
  downloadWorksheet: $('#download-worksheet'),
  downloadAnswerKey: $('#download-answer-key'),
  newWorksheetBtn: $('#new-worksheet-btn'),

  // Stats
  statBlanks: $('#stat-blanks'),
  statTF: $('#stat-tf'),
  statMatch: $('#stat-match'),
  statShort: $('#stat-short'),
  statLong: $('#stat-long'),

  // Error
  errorToast: $('#error-toast'),
  errorMessage: $('#error-message'),
  errorClose: $('#error-close'),
};

// ═══════════════════════════════════════════
//  State
// ═══════════════════════════════════════════

let state = {
  pdfFile: null,
  isGenerating: false,
  resultData: null,
};

// ═══════════════════════════════════════════
//  PDF Upload
// ═══════════════════════════════════════════

function setupDropzone() {
  const dropzone = elements.pdfDropzone;
  const input = elements.pdfInput;

  dropzone.addEventListener('click', () => input.click());

  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input.click();
    }
  });

  ['dragenter', 'dragover'].forEach(ev => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(ev => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-over');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) selectFile(files[0]);
  });

  input.addEventListener('change', () => {
    if (input.files.length > 0) selectFile(input.files[0]);
  });
}

function selectFile(file) {
  if (file.type !== 'application/pdf') {
    showError('Please upload a PDF file.');
    return;
  }
  if (file.size > 15 * 1024 * 1024) {
    showError('PDF is too large. Maximum size is 15MB.');
    return;
  }

  state.pdfFile = file;
  elements.pdfName.textContent = file.name;
  elements.pdfSize.textContent = formatSize(file.size);
  elements.pdfDropzone.hidden = true;
  elements.pdfPreview.hidden = false;
  updateBtn();
}

function removeFile() {
  state.pdfFile = null;
  elements.pdfInput.value = '';
  elements.pdfDropzone.hidden = false;
  elements.pdfPreview.hidden = true;
  updateBtn();
}

function updateBtn() {
  elements.generateBtn.disabled = !state.pdfFile || state.isGenerating;
}

// ═══════════════════════════════════════════
//  Form Submission
// ═══════════════════════════════════════════

async function handleSubmit(e) {
  e.preventDefault();
  if (!state.pdfFile || state.isGenerating) return;

  state.isGenerating = true;
  updateBtn();
  setLoading(true);
  hideResults();
  showProgress();

  try {
    const formData = new FormData();
    formData.append('pdf', state.pdfFile);
    formData.append('classInfo', elements.classInfoInput.value || '');
    formData.append('chapterName', elements.chapterInput.value || '');
    formData.append('includeAnswerKey', elements.answerKeyToggle.checked ? 'true' : 'false');

    // Animate steps
    await animateStep('extract', 0, 20);
    await animateStep('analyze', 20, 40);
    await animateStep('generate', 40, 60);

    const includeAnswerKey = elements.answerKeyToggle.checked;
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: formData,
    });

    await animateStep('pdf', 60, 90);

    if (!response.ok) {
      let errData;
      try { errData = await response.json(); } catch { errData = { error: 'Server error.' }; }
      throw new Error(errData.error || 'Failed to generate worksheet.');
    }

    if (includeAnswerKey) {
      const data = await response.json();
      state.resultData = data;
      elements.statBlanks.textContent = data.stats.fillInBlanks;
      elements.statTF.textContent = data.stats.trueFalse;
      elements.statMatch.textContent = data.stats.matchFollowing;
      elements.statShort.textContent = data.stats.shortAnswer;
      elements.statLong.textContent = data.stats.longAnswer;
      elements.downloadAnswerKey.hidden = false;
    } else {
      const blob = await response.blob();
      state.resultData = {
        worksheetBlob: blob,
        worksheetFilename: 'Infinity_Coaching_Worksheet.pdf',
      };
      elements.statBlanks.textContent = '8';
      elements.statTF.textContent = '8';
      elements.statMatch.textContent = '5';
      elements.statShort.textContent = '6';
      elements.statLong.textContent = '3';
      elements.downloadAnswerKey.hidden = true;
    }

    setProgress(100);
    completeAllSteps();
    await delay(600);
    hideProgress();
    showResults();

  } catch (err) {
    console.error('Generation failed:', err);
    showError(err.message || 'Something went wrong.');
    hideProgress();
  } finally {
    state.isGenerating = false;
    updateBtn();
    setLoading(false);
  }
}

// ═══════════════════════════════════════════
//  Downloads
// ═══════════════════════════════════════════

function downloadWorksheet() {
  if (!state.resultData) return;
  if (state.resultData.worksheetBlob) {
    dlBlob(state.resultData.worksheetBlob, state.resultData.worksheetFilename);
  } else if (state.resultData.worksheet) {
    const bytes = atob(state.resultData.worksheet.data);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    dlBlob(new Blob([arr], { type: 'application/pdf' }), state.resultData.worksheet.filename);
  }
}

function downloadAnswerKey() {
  if (!state.resultData?.answerKey) return;
  const bytes = atob(state.resultData.answerKey.data);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  dlBlob(new Blob([arr], { type: 'application/pdf' }), state.resultData.answerKey.filename);
}

function dlBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ═══════════════════════════════════════════
//  Progress
// ═══════════════════════════════════════════

function showProgress() {
  elements.progressSection.hidden = false;
  setProgress(0);
  Object.values(elements.steps).forEach(s => s.classList.remove('active', 'done'));
}

function hideProgress() { elements.progressSection.hidden = true; }

function setProgress(pct) { elements.progressBar.style.width = `${pct}%`; }

function completeAllSteps() {
  Object.values(elements.steps).forEach(s => { s.classList.remove('active'); s.classList.add('done'); });
}

async function animateStep(name, from, to) {
  const step = elements.steps[name];
  if (!step) return;
  const order = ['extract', 'analyze', 'generate', 'pdf'];
  const idx = order.indexOf(name);
  for (let i = 0; i < idx; i++) {
    elements.steps[order[i]].classList.remove('active');
    elements.steps[order[i]].classList.add('done');
  }
  step.classList.add('active');
  setProgress(from);
  const dur = 400 + Math.random() * 300;
  const t0 = Date.now();
  await new Promise(resolve => {
    (function tick() {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setProgress(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      p < 1 ? requestAnimationFrame(tick) : resolve();
    })();
  });
}

// ═══════════════════════════════════════════
//  Results
// ═══════════════════════════════════════════

function showResults() {
  elements.resultsSection.hidden = false;
  elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  $$('.stat-value').forEach(el => {
    const target = parseInt(el.textContent);
    animateNumber(el, 0, target, 600);
  });
}

function hideResults() { elements.resultsSection.hidden = true; }

function animateNumber(el, from, to, dur) {
  const t0 = Date.now();
  (function tick() {
    const p = Math.min((Date.now() - t0) / dur, 1);
    el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })();
}

// ═══════════════════════════════════════════
//  Helpers
// ═══════════════════════════════════════════

function setLoading(on) {
  elements.generateBtn.classList.toggle('loading', on);
  elements.btnContent.hidden = on;
  elements.btnLoading.hidden = !on;
}

function showError(msg) {
  elements.errorMessage.textContent = msg;
  elements.errorToast.hidden = false;
  setTimeout(() => { elements.errorToast.hidden = true; }, 6000);
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function resetForm() {
  removeFile();
  hideResults();
  hideProgress();
  state.resultData = null;
  elements.classInfoInput.value = '';
  elements.chapterInput.value = '';
  elements.answerKeyToggle.checked = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ═══════════════════════════════════════════
//  Init
// ═══════════════════════════════════════════

setupDropzone();
elements.pdfRemove.addEventListener('click', removeFile);
elements.form.addEventListener('submit', handleSubmit);
elements.downloadWorksheet.addEventListener('click', downloadWorksheet);
elements.downloadAnswerKey.addEventListener('click', downloadAnswerKey);
elements.newWorksheetBtn.addEventListener('click', resetForm);
elements.errorClose.addEventListener('click', () => { elements.errorToast.hidden = true; });
updateBtn();
