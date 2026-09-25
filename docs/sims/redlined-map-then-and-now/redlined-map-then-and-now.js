// A Redlined Map, Then and Now — Leaflet
// CANVAS_HEIGHT: 560
// Bloom Level: Analyze — examine the relationship between historical grade and present-day outcome.
// Data note: neighborhood markers use real approximate locations; HOLC grades and present-day
// figures are illustrative, consistent with general patterns documented in redlining research
// (see this chapter's references), not exact statistics for these specific neighborhoods.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .lf-wrap { font-family: Arial, Helvetica, sans-serif; height: 558px; overflow:hidden; background:aliceblue; }
      .lf-header { text-align:center; padding:8px; }
      .lf-header h2 { margin:0; font-size:16px; color:#222; }
      .lf-header p { margin:2px 0 0; font-size:11px; color:#666; }
      #lf-map { width:100%; height:360px; }
      .lf-controls { display:flex; align-items:center; justify-content:center; gap:16px; padding:8px; background:#e0f2fe; font-size:12px; }
      .lf-controls label { display:flex; align-items:center; gap:6px; }
      .lf-legend { display:flex; justify-content:center; gap:14px; padding:6px; background:#fff; font-size:11px; border-top:1px solid #ddd; flex-wrap:wrap; }
      .lf-swatch { width:14px; height:14px; display:inline-block; border-radius:3px; margin-right:4px; vertical-align:middle; }
      .lf-note { padding:4px 12px; font-size:10px; color:#888; text-align:center; font-style:italic; }
      .info-box { background: rgba(255,255,255,0.97); padding:8px 10px; border-radius:6px; box-shadow:0 1px 6px rgba(0,0,0,0.25); font-size:12px; max-width:220px; }
      .info-box h4 { margin:0 0 4px; font-size:13px; }
    </style>
    <div class="lf-wrap">
      <div class="lf-header">
        <h2>A Redlined Map, Then and Now — Minneapolis</h2>
        <p>1930s HOLC grade compared with an illustrative present-day dataset</p>
      </div>
      <div id="lf-map"></div>
      <div class="lf-controls">
        <label>Opacity <input type="range" id="lf-opacity" min="0" max="100" value="70"></label>
        <label>Present-day layer:
          <select id="lf-dataset">
            <option value="value">Median Home Value</option>
            <option value="canopy">Tree Canopy %</option>
          </select>
        </label>
      </div>
      <div class="lf-legend">
        <span><span class="lf-swatch" style="background:#2ecc71"></span>HOLC A</span>
        <span><span class="lf-swatch" style="background:#3498db"></span>HOLC B</span>
        <span><span class="lf-swatch" style="background:#f1c40f"></span>HOLC C</span>
        <span><span class="lf-swatch" style="background:#e74c3c"></span>HOLC D</span>
      </div>
      <div class="lf-note">Neighborhood markers use real approximate locations. HOLC grades and present-day figures are illustrative, consistent with general patterns documented in redlining research — not exact current statistics.</div>
    </div>
  `;

  const neighborhoods = [
    { name: 'North Minneapolis', lat: 44.995, lng: -93.311, grade: 'D', value: 220, canopy: 18,
      rationale: 'HOLC surveyor rationale (illustrative, consistent with the historical record): "infiltration of undesirable population" cited as a factor lowering the grade.' },
    { name: 'Phillips', lat: 44.955, lng: -93.262, grade: 'D', value: 230, canopy: 15,
      rationale: 'HOLC surveyor rationale (illustrative): proximity to industrial land and a racially diverse population cited as lowering the grade.' },
    { name: 'Powderhorn', lat: 44.940, lng: -93.262, grade: 'C', value: 290, canopy: 22,
      rationale: 'HOLC surveyor rationale (illustrative): "declining" older housing stock cited, though ownership rates were relatively stable.' },
    { name: 'Prospect Park', lat: 44.973, lng: -93.212, grade: 'B', value: 420, canopy: 35,
      rationale: 'HOLC surveyor rationale (illustrative): "still desirable" but not the highest grade due to age of housing stock.' },
    { name: 'Southwest Minneapolis', lat: 44.925, lng: -93.320, grade: 'A', value: 550, canopy: 40,
      rationale: 'HOLC surveyor rationale (illustrative): newer housing stock and homogeneous population cited as reasons for the top grade.' }
  ];

  const gradeColor = { A: '#2ecc71', B: '#3498db', C: '#f1c40f', D: '#e74c3c' };

  const map = L.map('lf-map', { zoomControl: true, scrollWheelZoom: false }).setView([44.96, -93.28], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors', maxZoom: 16
  }).addTo(map);

  const opacitySlider = document.getElementById('lf-opacity');
  const datasetSelect = document.getElementById('lf-dataset');

  const circles = neighborhoods.map((n) => {
    const c = L.circle([n.lat, n.lng], {
      radius: 1400,
      color: '#333',
      weight: 1,
      fillColor: gradeColor[n.grade],
      fillOpacity: opacitySlider.value / 100
    }).addTo(map);
    c.bindTooltip(n.name + ' — HOLC ' + n.grade);
    c.on('click', () => showInfo(n));
    return c;
  });

  const presentLayer = neighborhoods.map((n) => {
    const c = L.circleMarker([n.lat, n.lng], {
      radius: 6,
      color: '#1e293b',
      weight: 1,
      fillColor: presentColor(n, datasetSelect.value),
      fillOpacity: 0.9
    }).addTo(map);
    c.on('click', () => showInfo(n));
    return c;
  });

  function presentColor(n, key) {
    const v = n[key];
    const max = key === 'value' ? 600 : 45;
    const t = constrainFrac(v / max);
    const light = 90 - t * 60;
    return `hsl(210, 70%, ${light}%)`;
  }
  function constrainFrac(x) { return Math.max(0, Math.min(1, x)); }

  const infoControl = L.control({ position: 'topright' });
  infoControl.onAdd = function () {
    this._div = L.DomUtil.create('div', 'info-box');
    this._div.innerHTML = '<h4>Neighborhood Info</h4>Click a marker for details.';
    return this._div;
  };
  infoControl.addTo(map);

  function showInfo(n) {
    const datasetLabel = datasetSelect.value === 'value' ? 'Median home value' : 'Tree canopy';
    const datasetValue = datasetSelect.value === 'value' ? ('$' + n.value + 'k') : (n.canopy + '%');
    document.querySelector('.info-box').innerHTML =
      '<h4>' + n.name + '</h4>' +
      '1930s HOLC grade: <b>' + n.grade + '</b><br/>' +
      datasetLabel + ' (illustrative): <b>' + datasetValue + '</b><br/>' +
      '<small>' + n.rationale + '</small>';
  }

  opacitySlider.addEventListener('input', () => {
    circles.forEach((c) => c.setStyle({ fillOpacity: opacitySlider.value / 100 }));
  });
  datasetSelect.addEventListener('change', () => {
    presentLayer.forEach((c, i) => c.setStyle({ fillColor: presentColor(neighborhoods[i], datasetSelect.value) }));
  });

  // Container size may not be final at construction time (just inserted via innerHTML).
  setTimeout(() => { map.invalidateSize(); }, 50);
  setTimeout(() => { map.invalidateSize(); }, 300);
});
