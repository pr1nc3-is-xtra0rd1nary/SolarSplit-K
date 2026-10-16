// SolarSplit-K shared JavaScript
// This file powers the forms, tables, charts, and simple local data storage.
// It keeps the project beginner-friendly while still working on a static website.

const STORAGE_KEYS = {
  trials: 'solarSplitTrials',
  logs: 'solarSplitLogs',
  budget: 'solarSplitBudget',
  literature: 'solarSplitLiterature',
  presentation: 'solarSplitPresentation'
};

const SIMULATED_TRIALS = [
  {
    id: 'sim-1',
    name: 'SIMULATED-01 Baseline Reactor',
    date: '2026-04-12',
    reactor: 'Baseline glass reactor',
    lightLux: 12000,
    tempC: 30,
    durationMin: 60,
    notes: 'SIMULATED example only: baseline trial for comparison. Replace with actual observations before reporting results.',
    h2Amount: 1.8,
    h2Unit: 'mL',
    h2Method: 'SIMULATED gas measurement',
    o2Amount: 0.9,
    o2Unit: 'mL',
    o2Method: 'SIMULATED gas measurement',
    verified: 'no',
    source: 'SIMULATED'
  },
  {
    id: 'sim-2',
    name: 'SIMULATED-02 Coated Reactor',
    date: '2026-04-14',
    reactor: 'Coated high-surface-area tray',
    lightLux: 15000,
    tempC: 32,
    durationMin: 60,
    notes: 'SIMULATED example only: higher surface area and stronger light exposure. Replace with real measurements before making claims.',
    h2Amount: 2.9,
    h2Unit: 'mL',
    h2Method: 'SIMULATED gas measurement',
    o2Amount: 1.4,
    o2Unit: 'mL',
    o2Method: 'SIMULATED gas measurement',
    verified: 'no',
    source: 'SIMULATED'
  }
];

const DEFAULT_BUDGET = [
  { id: 'cost-1', item: 'Photocatalyst sample', quantity: 1, unitPrice: 850, notes: 'Estimated cost until verified', subtotal: 850 },
  { id: 'cost-2', item: 'Glass reactor vessel', quantity: 1, unitPrice: 1200, notes: 'Estimated cost until verified', subtotal: 1200 },
  { id: 'cost-3', item: 'Light meter / lux meter', quantity: 1, unitPrice: 2500, notes: 'Estimated cost until verified', subtotal: 2500 }
];

const DEFAULT_LOGS = [
  {
    id: 'log-1',
    date: '2026-04-10',
    title: 'SIMULATED initial setup',
    details: 'SIMULATED example: Initial setup was simple and the teacher noted the need for better light control and clearer gas-measurement methods.'
  }
];

const DEFAULT_LITERATURE = [
  {
    id: 'lit-1',
    author: 'Example Author',
    year: '2024',
    title: 'Placeholder literature entry',
    source: 'Journal or conference name',
    url: 'https://example.com/replace-with-real-source',
    finding: 'SIMULATED example only: replace this text with a real paper summary after reading the actual source.',
    limitation: 'This is not a real paper and should be replaced before final presentation.',
    compare: 'A published claim must be kept separate from my own observations until the real source is reviewed.'
  }
];

const DEFAULT_PRESENTATION = {
  abstract: 'SIMULATED example: This project investigates low-cost photocatalytic water-splitting designs for a school science fair. The work compares a baseline design with an alternative concept and emphasizes safety, literature review, and honest evidence. Replace this summary with your own actual method and results.',
  posterOutline: 'Title\nResearch question\nBackground\nMethod\nData and graphs\nDiscussion\nLimitations\nConclusion',
  methodology: 'SIMULATED example: A small reactor, fixed light intensity, and repeated trials were planned. Replace with your actual apparatus and evidence collection procedure.',
  results: 'SIMULATED example: This section should report only real data with a clear label about uncertainty and validity.',
  limitations: 'SIMULATED example: This project relies on careful records, supervision, and a clear separation between simulated and verified data.',
  originality: 'SIMULATED example: Originality must be supported by a review of the real literature. Until then, do not claim a new invention.',
  futureWork: 'SIMULATED example: Repeat with verified measurements, larger sample sizes, and a more rigorous comparison of reactor variables.',
  judgeQuestions: '1. What is the evidence that gas generation was measured accurately?\n2. What remains uncertain?\n3. How did you separate real data from examples?'
};

function loadStoredArray(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    saveStoredArray(key, fallback);
    return [...fallback];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...fallback];
  } catch (error) {
    return [...fallback];
  }
}

function saveStoredArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadStoredObject(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return JSON.parse(JSON.stringify(fallback));
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : JSON.parse(JSON.stringify(fallback));
  } catch (error) {
    return JSON.parse(JSON.stringify(fallback));
  }
}

function toMoney(value) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2
  }).format(value || 0);
}

function parseNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function summaryStats(trials) {
  const valid = trials.filter((trial) => {
    const hasH2 = trial.h2Amount !== '' && trial.h2Amount !== null && trial.h2Amount !== undefined;
    const hasO2 = trial.o2Amount !== '' && trial.o2Amount !== null && trial.o2Amount !== undefined;
    return (hasH2 || hasO2) && trial.durationMin > 0;
  });

  const withH2 = valid.filter((trial) => trial.h2Amount !== undefined && trial.h2Amount !== null && trial.h2Amount !== '');
  const withO2 = valid.filter((trial) => trial.o2Amount !== undefined && trial.o2Amount !== null && trial.o2Amount !== '');

  const mean = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  const stdDev = (values) => {
    if (!values.length) return 0;
    const avg = mean(values);
    const variance = values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / values.length;
    return Math.sqrt(variance);
  };

  const h2Rates = valid.map((trial) => {
    const value = parseNumber(trial.h2Amount);
    const minutes = parseNumber(trial.durationMin);
    return minutes > 0 ? value / minutes : 0;
  });

  const o2Rates = valid.map((trial) => {
    const value = parseNumber(trial.o2Amount);
    const minutes = parseNumber(trial.durationMin);
    return minutes > 0 ? value / minutes : 0;
  });

  return {
    totalTrials: trials.length,
    validTrials: valid.length,
    withH2: withH2.length,
    withO2: withO2.length,
    h2Mean: mean(h2Rates),
    h2StdDev: stdDev(h2Rates),
    o2Mean: mean(o2Rates),
    o2StdDev: stdDev(o2Rates),
    missingData: trials.filter((trial) => !trial.h2Amount && !trial.o2Amount).length
  };
}

function renderTrialTable() {
  const tableBody = document.getElementById('trial-table-body');
  if (!tableBody) return;

  const trials = loadStoredArray(STORAGE_KEYS.trials, SIMULATED_TRIALS);

  if (!trials.length) {
    tableBody.innerHTML = '<tr><td colspan="10"><div class="empty-state">No trials saved yet. Use the planner page to add one.</div></td></tr>';
    return;
  }

  tableBody.innerHTML = trials
    .map((trial) => {
      const h2Value = trial.h2Amount !== undefined && trial.h2Amount !== null && trial.h2Amount !== '' ? `${trial.h2Amount} ${trial.h2Unit || ''}`.trim() : '—';
      const o2Value = trial.o2Amount !== undefined && trial.o2Amount !== null && trial.o2Amount !== '' ? `${trial.o2Amount} ${trial.o2Unit || ''}`.trim() : '—';

      return `
        <tr>
          <td>${trial.name}</td>
          <td>${trial.date}</td>
          <td>${trial.reactor}</td>
          <td>${trial.lightLux}</td>
          <td>${trial.tempC}</td>
          <td>${trial.durationMin}</td>
          <td>${h2Value}</td>
          <td>${o2Value}</td>
          <td>${trial.notes || '—'}</td>
          <td>
            <button class="button secondary" data-action="edit" data-id="${trial.id}" type="button">Edit</button>
            <button class="button danger" data-action="delete" data-id="${trial.id}" type="button">Delete</button>
          </td>
        </tr>
      `;
    })
    .join('');

  tableBody.querySelectorAll('[data-action="delete"]').forEach((button) => {
    button.addEventListener('click', () => deleteTrial(button.dataset.id));
  });

  tableBody.querySelectorAll('[data-action="edit"]').forEach((button) => {
    button.addEventListener('click', () => editTrial(button.dataset.id));
  });
}

function buildTrialDraftFromForm() {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `trial-${Date.now()}`,
    name: document.getElementById('trial-name').value.trim(),
    date: document.getElementById('trial-date').value,
    reactor: document.getElementById('reactor-label').value.trim(),
    lightLux: parseNumber(document.getElementById('light-lux').value),
    tempC: parseNumber(document.getElementById('temp-c').value),
    durationMin: parseNumber(document.getElementById('duration-min').value),
    notes: document.getElementById('notes').value.trim(),
    h2Amount: document.getElementById('h2-amount').value === '' ? '' : parseNumber(document.getElementById('h2-amount').value),
    h2Unit: document.getElementById('h2-unit').value.trim(),
    h2Method: document.getElementById('h2-method').value.trim(),
    o2Amount: document.getElementById('o2-amount').value === '' ? '' : parseNumber(document.getElementById('o2-amount').value),
    o2Unit: document.getElementById('o2-unit').value.trim(),
    o2Method: document.getElementById('o2-method').value.trim(),
    verified: 'no',
    source: 'USER_INPUT'
  };
}

function saveTrial(trial) {
  const trials = loadStoredArray(STORAGE_KEYS.trials, SIMULATED_TRIALS);
  const index = trials.findIndex((item) => item.id === trial.id);

  if (index >= 0) {
    trials[index] = trial;
  } else {
    trials.push(trial);
  }

  saveStoredArray(STORAGE_KEYS.trials, trials);
  window.location.href = 'data.html';
}

function deleteTrial(id) {
  const trials = loadStoredArray(STORAGE_KEYS.trials, SIMULATED_TRIALS).filter((trial) => trial.id !== id);
  saveStoredArray(STORAGE_KEYS.trials, trials);
  renderTrialTable();
}

function editTrial(id) {
  const trials = loadStoredArray(STORAGE_KEYS.trials, SIMULATED_TRIALS);
  const trial = trials.find((item) => item.id === id);
  if (!trial) return;

  const form = document.getElementById('trial-form');
  if (!form) return;

  document.getElementById('trial-name').value = trial.name;
  document.getElementById('trial-date').value = trial.date;
  document.getElementById('reactor-label').value = trial.reactor;
  document.getElementById('light-lux').value = trial.lightLux;
  document.getElementById('temp-c').value = trial.tempC;
  document.getElementById('duration-min').value = trial.durationMin;
  document.getElementById('notes').value = trial.notes;
  document.getElementById('h2-amount').value = trial.h2Amount ?? '';
  document.getElementById('h2-unit').value = trial.h2Unit ?? '';
  document.getElementById('h2-method').value = trial.h2Method ?? '';
  document.getElementById('o2-amount').value = trial.o2Amount ?? '';
  document.getElementById('o2-unit').value = trial.o2Unit ?? '';
  document.getElementById('o2-method').value = trial.o2Method ?? '';

  form.dataset.editId = trial.id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleTrialSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const trial = buildTrialDraftFromForm();

  if (form.dataset.editId) {
    trial.id = form.dataset.editId;
  }

  if (!trial.name || !trial.date || !trial.reactor) {
    alert('Please fill in the required trial information.');
    return;
  }

  saveTrial(trial);
}

function exportTrialsCSV() {
  const trials = loadStoredArray(STORAGE_KEYS.trials, SIMULATED_TRIALS);

  const headers = ['name', 'date', 'reactor', 'lightLux', 'tempC', 'durationMin', 'notes', 'h2Amount', 'h2Unit', 'h2Method', 'o2Amount', 'o2Unit', 'o2Method', 'source'];
  const rows = trials.map((trial) => headers.map((key) => `"${String(trial[key] ?? '').replace(/"/g, '""')}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'solarSplit-simulated-trials.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}

function importTrialsCSV(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result || '');
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) {
      alert('The CSV file is empty or incomplete.');
      return;
    }

    const headers = lines[0].split(',').map((header) => header.replace(/^"|"$/g, '').trim());
    const imported = lines.slice(1).map((line) => {
      const values = line.match(/("[^"]*(?:""[^"]*)*"|[^,]+)/g) || [];
      const row = {};
      headers.forEach((header, index) => {
        const raw = (values[index] || '').replace(/^"|"$/g, '').replace(/""/g, '"');
        row[header] = raw;
      });
      return {
        id: crypto.randomUUID ? crypto.randomUUID() : `import-${Date.now()}`,
        name: row.name || 'Imported trial',
        date: row.date || new Date().toISOString().slice(0, 10),
        reactor: row.reactor || 'Imported reactor',
        lightLux: parseNumber(row.lightLux),
        tempC: parseNumber(row.tempC),
        durationMin: parseNumber(row.durationMin),
        notes: row.notes || 'Imported from CSV',
        h2Amount: row.h2Amount === '' ? '' : parseNumber(row.h2Amount),
        h2Unit: row.h2Unit || '',
        h2Method: row.h2Method || '',
        o2Amount: row.o2Amount === '' ? '' : parseNumber(row.o2Amount),
        o2Unit: row.o2Unit || '',
        o2Method: row.o2Method || '',
        verified: (row.verified || 'no').toLowerCase(),
        source: row.source || 'IMPORTED_CSV'
      };
    });

    saveStoredArray(STORAGE_KEYS.trials, imported);
    renderTrialTable();
  };

  reader.readAsText(file);
}

function resetDataToSample() {
  saveStoredArray(STORAGE_KEYS.trials, SIMULATED_TRIALS);
  renderTrialTable();
  if (document.body.dataset.page === 'analysis') {
    renderAnalysis();
  }
}

function renderAnalysis() {
  const summaryTarget = document.getElementById('analysis-summary');
  const warningsTarget = document.getElementById('analysis-warnings');
  const groupTarget = document.getElementById('group-summary');
  const rateChartCanvas = document.getElementById('rateChart');

  if (!summaryTarget) return;

  const trials = loadStoredArray(STORAGE_KEYS.trials, SIMULATED_TRIALS);
  const stats = summaryStats(trials);

  summaryTarget.innerHTML = `
    <div class="info-card">
      <h3>Total trials</h3>
      <p>${stats.totalTrials}</p>
    </div>
    <div class="info-card">
      <h3>Valid trials</h3>
      <p>${stats.validTrials}</p>
    </div>
    <div class="info-card">
      <h3>Mean H₂ rate</h3>
      <p>${stats.h2Mean.toFixed(3)} units/min</p>
    </div>
    <div class="info-card">
      <h3>Mean O₂ rate</h3>
      <p>${stats.o2Mean.toFixed(3)} units/min</p>
    </div>
  `;

  const warnings = [];
  if (stats.missingData > 0) {
    warnings.push('Missing gas data in some trials. Use caution when comparing results.');
  }
  if (stats.validTrials === 0) {
    warnings.push('No valid trials with measured gas values were recorded.');
  }
  if (stats.h2StdDev > 0 || stats.o2StdDev > 0) {
    warnings.push('There is variation between trials. Repeatability is an important part of the evidence.');
  }
  if (warnings.length === 0) {
    warnings.push('No major warnings. Still check measurement method, controls, and repeatability before claiming a trend.');
  }

  warningsTarget.innerHTML = warnings.map((warning) => `<li>${warning}</li>`).join('');

  const groupRows = Array.from(new Set(trials.map((trial) => trial.reactor).filter(Boolean))).map((design) => {
    const designTrials = trials.filter((trial) => trial.reactor === design);
    return {
      design,
      avgRate: designTrials.reduce((sum, trial) => sum + (parseNumber(trial.h2Amount) / Math.max(1, parseNumber(trial.durationMin))), 0) / Math.max(1, designTrials.length)
    };
  });

  groupTarget.innerHTML = groupRows.length
    ? groupRows.map((group) => `<p><strong>${group.design}</strong>: average H₂ rate ${group.avgRate.toFixed(3)} units/min</p>`).join('')
    : '<p>No reactor groups available yet.</p>';

  const chartLabels = trials.map((trial) => trial.name || 'Trial');
  const chartData = trials.map((trial) => {
    if (!trial.durationMin || !trial.h2Amount) return 0;
    return parseNumber(trial.h2Amount) / parseNumber(trial.durationMin);
  });

  if (window.rateChart) {
    window.rateChart.destroy();
  }

  if (rateChartCanvas) {
    window.rateChart = new Chart(rateChartCanvas, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'H₂ production rate (units/min)',
          data: chartData,
          backgroundColor: '#0d6e6d',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}

function renderComparisons() {
  const container = document.getElementById('comparison-results');
  if (!container) return;

  const trials = loadStoredArray(STORAGE_KEYS.trials, SIMULATED_TRIALS);
  const grouped = Array.from(new Set(trials.map((trial) => trial.reactor).filter(Boolean))).map((reactor) => {
    const reactorTrials = trials.filter((trial) => trial.reactor === reactor);
    const gasValues = reactorTrials
      .map((trial) => parseNumber(trial.h2Amount) / Math.max(1, parseNumber(trial.durationMin)))
      .filter((value) => Number.isFinite(value) && value > 0);

    return {
      reactor,
      performance: gasValues.length ? gasValues.reduce((sum, value) => sum + value, 0) / gasValues.length : 0,
      repeatability: reactorTrials.length,
      cost: reactorTrials.length * 1500,
      durability: reactorTrials.length > 1 ? 'Moderate' : 'Not enough evidence',
      evidence: gasValues.length > 1 ? 'Moderate' : 'Insufficient'
    };
  });

  if (!grouped.length) {
    container.innerHTML = '<div class="empty-state">Add trials to compare designs.</div>';
    return;
  }

  const bestEvidence = grouped.filter((item) => item.evidence !== 'Insufficient');
  container.innerHTML = grouped.map((item) => {
    const winnerText = bestEvidence.length && item.reactor === bestEvidence[0].reactor ? 'Leading candidate based on current evidence' : 'No decisive winner yet';
    return `
      <article class="comparison-card">
        <h3>${item.reactor}</h3>
        <p><strong>Performance:</strong> ${item.performance.toFixed(3)} units/min</p>
        <p><strong>Repeatability:</strong> ${item.repeatability} trial(s)</p>
        <p><strong>Cost estimate:</strong> ${toMoney(item.cost)}</p>
        <p><strong>Material durability:</strong> ${item.durability}</p>
        <p><strong>Evidence quality:</strong> ${item.evidence}</p>
        <p><strong>Decision:</strong> ${winnerText}</p>
      </article>
    `;
  }).join('');
}

function renderBudget() {
  const body = document.getElementById('budget-body');
  const total = document.getElementById('budget-total');
  if (!body || !total) return;

  const budget = loadStoredArray(STORAGE_KEYS.budget, DEFAULT_BUDGET);

  body.innerHTML = budget.map((row) => {
    const subtotal = parseNumber(row.quantity) * parseNumber(row.unitPrice);
    return `
      <tr>
        <td><input data-kind="item" data-id="${row.id}" value="${row.item}" /></td>
        <td><input data-kind="quantity" data-id="${row.id}" type="number" min="0" value="${row.quantity}" /></td>
        <td><input data-kind="unitPrice" data-id="${row.id}" type="number" min="0" step="0.01" value="${row.unitPrice}" /></td>
        <td><input data-kind="notes" data-id="${row.id}" value="${row.notes}" /></td>
        <td>${toMoney(subtotal)}</td>
        <td><button class="button danger" data-action="remove-budget" data-id="${row.id}" type="button">Remove</button></td>
      </tr>
    `;
  }).join('');

  body.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', () => updateBudgetRow(input.dataset.id, input.dataset.kind, input.value));
  });

  body.querySelectorAll('[data-action="remove-budget"]').forEach((button) => {
    button.addEventListener('click', () => removeBudgetRow(button.dataset.id));
  });

  const grandTotal = budget.reduce((sum, row) => sum + parseNumber(row.quantity) * parseNumber(row.unitPrice), 0);
  total.textContent = `KES ${grandTotal.toFixed(2)}`;
}

function updateBudgetRow(id, kind, value) {
  const budget = loadStoredArray(STORAGE_KEYS.budget, DEFAULT_BUDGET);
  const row = budget.find((item) => item.id === id);
  if (!row) return;

  if (kind === 'item') row.item = value;
  if (kind === 'quantity') row.quantity = parseNumber(value);
  if (kind === 'unitPrice') row.unitPrice = parseNumber(value);
  if (kind === 'notes') row.notes = value;

  row.subtotal = parseNumber(row.quantity) * parseNumber(row.unitPrice);
  saveStoredArray(STORAGE_KEYS.budget, budget);
  renderBudget();
}

function removeBudgetRow(id) {
  const budget = loadStoredArray(STORAGE_KEYS.budget, DEFAULT_BUDGET).filter((row) => row.id !== id);
  saveStoredArray(STORAGE_KEYS.budget, budget);
  renderBudget();
}

function addBudgetRow() {
  const budget = loadStoredArray(STORAGE_KEYS.budget, DEFAULT_BUDGET);
  budget.push({
    id: `cost-${Date.now()}`,
    item: 'New item',
    quantity: 1,
    unitPrice: 0,
    notes: 'Estimate until verified',
    subtotal: 0
  });
  saveStoredArray(STORAGE_KEYS.budget, budget);
  renderBudget();
}

function renderLogs() {
  const target = document.getElementById('log-list');
  if (!target) return;

  const logs = loadStoredArray(STORAGE_KEYS.logs, DEFAULT_LOGS);

  if (!logs.length) {
    target.innerHTML = '<div class="empty-state">No research log entries yet.</div>';
    return;
  }

  target.innerHTML = logs.map((entry) => `
    <div class="log-item">
      <p><strong>${entry.date}</strong> • ${entry.title}</p>
      <p>${entry.details}</p>
    </div>
  `).join('');
}

function renderLiterature() {
  const target = document.getElementById('literature-list');
  if (!target) return;

  const sources = loadStoredArray(STORAGE_KEYS.literature, DEFAULT_LITERATURE);

  if (!sources.length) {
    target.innerHTML = '<div class="empty-state">No literature records yet. Add a source using the form above.</div>';
    return;
  }

  target.innerHTML = sources.map((source) => `
    <div class="literature-item">
      <p><strong>${source.author} (${source.year})</strong></p>
      <p>${source.title}</p>
      <p><em>${source.source}</em></p>
      <p><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.url}</a></p>
      <p><strong>Main finding:</strong> ${source.finding}</p>
      <p><strong>Limitation:</strong> ${source.limitation}</p>
      <p><strong>My observations vs published claim:</strong> ${source.compare}</p>
    </div>
  `).join('');
}

function savePresentationData() {
  const form = document.getElementById('presentation-form');
  if (!form) return;

  const presentation = {
    abstract: document.getElementById('abstract').value,
    posterOutline: document.getElementById('poster-outline').value,
    methodology: document.getElementById('methodology').value,
    results: document.getElementById('results').value,
    limitations: document.getElementById('limitations').value,
    originality: document.getElementById('originality').value,
    futureWork: document.getElementById('future-work').value,
    judgeQuestions: document.getElementById('judge-questions').value
  };

  localStorage.setItem(STORAGE_KEYS.presentation, JSON.stringify(presentation));
}

function preloadPresentationData() {
  const form = document.getElementById('presentation-form');
  if (!form) return;

  const data = loadStoredObject(STORAGE_KEYS.presentation, DEFAULT_PRESENTATION);
  document.getElementById('abstract').value = data.abstract || '';
  document.getElementById('poster-outline').value = data.posterOutline || '';
  document.getElementById('methodology').value = data.methodology || '';
  document.getElementById('results').value = data.results || '';
  document.getElementById('limitations').value = data.limitations || '';
  document.getElementById('originality').value = data.originality || '';
  document.getElementById('future-work').value = data.futureWork || '';
  document.getElementById('judge-questions').value = data.judgeQuestions || '';
}

function initPlannerPage() {
  const form = document.getElementById('trial-form');
  if (!form) return;

  form.addEventListener('submit', handleTrialSubmit);

  const today = new Date().toISOString().slice(0, 10);
  document.getElementById('trial-date').value = today;

  if (form.dataset.editId) {
    // Intentionally left blank; editing is handled from table action.
  }
}

function initDataPage() {
  renderTrialTable();

  const exportButton = document.getElementById('export-csv');
  if (exportButton) exportButton.addEventListener('click', exportTrialsCSV);

  const importButton = document.getElementById('import-csv');
  if (importButton) importButton.addEventListener('change', (event) => importTrialsCSV(event.target.files[0]));

  const resetButton = document.getElementById('reset-data');
  if (resetButton) resetButton.addEventListener('click', resetDataToSample);
}

function initLogPage() {
  const form = document.getElementById('log-form');
  if (!form) return;

  document.getElementById('log-date').value = new Date().toISOString().slice(0, 10);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const logs = loadStoredArray(STORAGE_KEYS.logs, DEFAULT_LOGS);
    logs.unshift({
      id: `log-${Date.now()}`,
      date: document.getElementById('log-date').value,
      title: document.getElementById('log-title').value.trim(),
      details: document.getElementById('log-details').value.trim()
    });

    saveStoredArray(STORAGE_KEYS.logs, logs);
    form.reset();
    document.getElementById('log-date').value = new Date().toISOString().slice(0, 10);
    renderLogs();
  });

  renderLogs();
}

function initLiteraturePage() {
  const form = document.getElementById('literature-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const sources = loadStoredArray(STORAGE_KEYS.literature, DEFAULT_LITERATURE);
    sources.unshift({
      id: `lit-${Date.now()}`,
      author: document.getElementById('lit-author').value.trim(),
      year: document.getElementById('lit-year').value.trim(),
      title: document.getElementById('lit-title').value.trim(),
      source: document.getElementById('lit-source').value.trim(),
      url: document.getElementById('lit-url').value.trim(),
      finding: document.getElementById('lit-finding').value.trim(),
      limitation: document.getElementById('lit-limitation').value.trim(),
      compare: document.getElementById('lit-compare').value.trim()
    });

    saveStoredArray(STORAGE_KEYS.literature, sources);
    form.reset();
    renderLiterature();
  });

  renderLiterature();
}

function initBudgetPage() {
  renderBudget();
  const addButton = document.getElementById('add-budget-row');
  if (addButton) addButton.addEventListener('click', addBudgetRow);
}

function initPresentationPage() {
  preloadPresentationData();
  const form = document.getElementById('presentation-form');
  if (!form) return;

  form.addEventListener('input', savePresentationData);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    savePresentationData();
    alert('Presentation notes saved locally in your browser.');
  });
}

function initSharedPage() {
  const currentPage = document.body.dataset.page;

  if (currentPage === 'planner') initPlannerPage();
  if (currentPage === 'data') initDataPage();
  if (currentPage === 'analysis') renderAnalysis();
  if (currentPage === 'comparison') renderComparisons();
  if (currentPage === 'log') initLogPage();
  if (currentPage === 'literature') initLiteraturePage();
  if (currentPage === 'budget') initBudgetPage();
  if (currentPage === 'presentation') initPresentationPage();
}

document.addEventListener('DOMContentLoaded', initSharedPage);

// A small note for beginners: storage is local to the browser, not a database.
// This keeps the project easy to use while still showing how a project tracker can work.
