/*
  SolarSplit-K styles
  This file gives the site a clean, modern research style with strong contrast,
  responsive cards, and an accessible layout for beginners.
*/

:root {
  --bg: #f6f9fc;
  --panel: #ffffff;
  --panel-alt: #edf3f7;
  --primary: #0d6e6d;
  --primary-dark: #0a4d4b;
  --accent: #f0b429;
  --text: #17313b;
  --muted: #59707d;
  --danger: #bf3c3c;
  --warning: #c97b10;
  --success: #1b7a54;
  --line: #dfe8ee;
  --shadow: 0 12px 28px rgba(11, 36, 46, 0.08);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

.container {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
}

.site-header {
  background: #0b2a32;
  color: white;
  border-bottom: 4px solid var(--accent);
  position: sticky;
  top: 0;
  z-index: 20;
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), #23a6a2);
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  font-weight: 700;
}

.brand-name {
  font-size: 1.2rem;
  font-weight: 700;
}

.brand-tag {
  font-size: 0.75rem;
  opacity: 0.8;
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.45rem;
}

.main-nav a {
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.84rem;
}

.main-nav a:hover,
.main-nav a.active {
  background: rgba(255, 255, 255, 0.12);
}

.hero {
  background: linear-gradient(135deg, #0d2d34, #123f48 55%, #0f5f61);
  color: white;
  padding: 4rem 0 3rem;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: center;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

h1 {
  margin: 0 0 1rem;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  line-height: 1.1;
}

h2 {
  margin-top: 0;
  font-size: clamp(1.6rem, 2vw, 2.1rem);
}

h3 {
  margin-top: 0;
  margin-bottom: 0.55rem;
}

.lead {
  font-size: 1.08rem;
  max-width: 700px;
  opacity: 0.96;
}

.cta-row,
.button-row,
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
}

.button {
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button.primary {
  background: var(--primary);
  color: white;
}

.button.secondary {
  background: white;
  color: var(--text);
  border: 1px solid var(--line);
}

.button.danger {
  background: var(--danger);
  color: white;
}

.hero-panel {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 18px;
  padding: 1.2rem;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 6px rgba(240, 180, 41, 0.2);
}

.tiny-label {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.metric-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.9rem;
}

.metric-list li {
  padding: 0.8rem 0.9rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
}

.metric-list span {
  display: block;
  margin-bottom: 0.25rem;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.section {
  padding: 2.5rem 0;
}

.alt-panel {
  background: var(--panel-alt);
}

.card-grid {
  display: grid;
  gap: 1.2rem;
}

.three-up {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.two-up {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.four-up {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.info-card,
.panel-block,
.mini-card,
.shortcut-card,
.log-item,
.literature-item,
.comparison-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.info-card,
.mini-card,
.panel-block,
.log-item,
.comparison-card,
.literature-item {
  padding: 1.2rem;
}

.content-stack {
  display: grid;
  gap: 1.2rem;
  margin-top: 1.6rem;
}

.standard-list {
  padding-left: 1.25rem;
  margin: 0.75rem 0 0;
}

.timeline {
  display: grid;
  gap: 1rem;
}

.timeline-item {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 1rem 1.1rem;
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 1rem;
  align-items: center;
}

.timeline-badge {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  font-weight: 700;
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.shortcut-card {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  text-align: center;
  font-weight: 700;
  background: linear-gradient(135deg, #f4f9fa, #edf9f7);
}

.page-shell {
  padding: 2.5rem 0 3rem;
}

.page-intro {
  margin-bottom: 1.4rem;
}

.notice {
  border-radius: 12px;
  padding: 0.9rem 1rem;
  margin: 0 0 1.2rem;
  border: 1px solid var(--line);
}

.notice.warning {
  background: #fff5e8;
  border-color: #f1d69a;
  color: #7a4d11;
}

.notice.caution {
  background: #fff6ea;
  border-color: #e7c78e;
}

.notice.info {
  background: #eaf4ff;
  border-color: #cfe0f5;
  color: #1c4469;
}

.warn-box {
  background: #fffaf2;
  border-color: #f1d7a9;
}

.planner-form {
  background: white;
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: var(--shadow);
  padding: 1.2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.7rem 0.8rem;
  background: #fbfcfd;
  color: var(--text);
}

textarea {
  resize: vertical;
}

.full-width {
  grid-column: 1 / -1;
}

.compact-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.gas-recording {
  background: #f3f9fa;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1rem;
}

.small-note {
  margin-top: 0;
  color: var(--muted);
}

.grid-two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
  margin-top: 1.2rem;
}

canvas {
  width: 100% !important;
  max-height: 380px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 780px;
}

th,
td {
  padding: 0.75rem 0.7rem;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

th {
  background: #f3f7f8;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.file-button {
  position: relative;
  overflow: hidden;
}

.file-button input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.log-list,
.literature-list {
  display: grid;
  gap: 0.8rem;
}

.log-item,
.literature-item {
  border-left: 4px solid var(--primary);
}

.total-value {
  margin: 0.25rem 0 1rem;
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 700;
  color: var(--primary-dark);
}

.empty-state {
  padding: 1rem;
  border: 1px dashed var(--line);
  border-radius: 12px;
  color: var(--muted);
  background: #fbfcfd;
}

.site-footer {
  background: #112d36;
  color: rgba(255, 255, 255, 0.8);
  padding: 1rem 0;
}

.footer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

@media (max-width: 980px) {
  .hero-inner,
  .grid-two,
  .two-up,
  .three-up,
  .four-up,
  .shortcut-grid {
    grid-template-columns: 1fr;
  }

  .nav-wrap {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-nav {
    justify-content: flex-start;
  }
}

@media (max-width: 620px) {
  .form-grid,
  .compact-grid {
    grid-template-columns: 1fr;
  }

  .button-row,
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .button {
    width: 100%;
    text-align: center;
  }
}
