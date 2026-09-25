// Global Migration Pattern Map — Leaflet
// CANVAS_HEIGHT: 580
// Bloom Level: Analyze — examine the relationship between documented causes and migration flows.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .lf-wrap { font-family: Arial, Helvetica, sans-serif; height: 578px; overflow:hidden; background:aliceblue; }
      .lf-header { text-align:center; padding:8px; }
      .lf-header h2 { margin:0; font-size:16px; color:#222; }
      .lf-header p { margin:2px 0 0; font-size:11px; color:#666; }
      #lf-map { width:100%; height:380px; }
      .lf-controls { display:flex; align-items:center; justify-content:center; gap:14px; padding:8px; background:#fff7ed; font-size:12px; flex-wrap:wrap; }
      .lf-controls label { display:flex; align-items:center; gap:4px; }
      .lf-legend { display:flex; justify-content:center; gap:16px; padding:6px; background:#fff; font-size:12px; border-top:1px solid #ddd; }
      .lf-swatch { width:20px; height:4px; display:inline-block; margin-right:4px; vertical-align:middle; }
      .lf-note { padding:4px 12px; font-size:10px; color:#888; text-align:center; font-style:italic; }
      .info-box { background: rgba(255,255,255,0.97); padding:8px 10px; border-radius:6px; box-shadow:0 1px 6px rgba(0,0,0,0.25); font-size:12px; max-width:260px; }
      .info-box h4 { margin:0 0 4px; font-size:13px; }
    </style>
    <div class="lf-wrap">
      <div class="lf-header">
        <h2>Global Migration Pattern Map</h2>
        <p>Six major, well-documented late-20th/21st-century migration flows</p>
      </div>
      <div id="lf-map"></div>
      <div class="lf-controls">
        <label><input type="checkbox" class="lf-filter" value="conflict" checked> Conflict / persecution</label>
        <label><input type="checkbox" class="lf-filter" value="economic" checked> Economic pressure</label>
        <label><input type="checkbox" class="lf-filter" value="environmental" checked> Environmental displacement</label>
      </div>
      <div class="lf-legend">
        <span><span class="lf-swatch" style="background:#dc2626"></span>Conflict</span>
        <span><span class="lf-swatch" style="background:#ea580c"></span>Economic</span>
        <span><span class="lf-swatch" style="background:#16a34a"></span>Environmental</span>
      </div>
      <div class="lf-note">Arrow width reflects relative documented magnitude. Click an arrow for sourced cause information.</div>
    </div>
  `;

  const flows = [
    { name: 'Syria to Europe', from: [33.5, 36.3], to: [52.5, 13.4], cause: 'conflict', magnitude: 5,
      detail: 'Syrian displacement following the 2011 civil war is among the largest forced-migration events of the 21st century.',
      source: 'Source type: UNHCR Global Trends reports.' },
    { name: 'Central America to United States', from: [14.1, -87.2], to: [29.8, -95.4], cause: 'economic', magnitude: 4,
      detail: 'Migration driven by a documented mix of economic pressure, gang violence, and, more recently, climate-linked agricultural disruption.',
      source: 'Source type: government migration statistics and UNHCR regional reports.' },
    { name: 'Venezuela to Colombia', from: [10.5, -66.9], to: [4.7, -74.1], cause: 'economic', magnitude: 5,
      detail: 'One of the largest displacement crises in the Western Hemisphere, driven by economic collapse and political crisis beginning in the mid-2010s.',
      source: 'Source type: UNHCR and Colombian government migration statistics.' },
    { name: 'Rakhine State (Myanmar) to Bangladesh', from: [20.8, 92.9], to: [21.4, 92.0], cause: 'conflict', magnitude: 3,
      detail: 'Rohingya displacement following documented violence in Rakhine State, Myanmar, beginning in 2017.',
      source: 'Source type: UNHCR Global Trends reports.' },
    { name: 'Ukraine to Poland', from: [50.45, 30.5], to: [52.2, 21.0], cause: 'conflict', magnitude: 5,
      detail: 'Large-scale displacement following the 2022 escalation of the Russia-Ukraine war, one of the fastest-growing displacement crises on record.',
      source: 'Source type: UNHCR Global Trends reports.' },
    { name: 'Pacific Islands to New Zealand', from: [1.3, 173.0], to: [-36.8, 174.7], cause: 'environmental', magnitude: 2,
      detail: 'Gradual, environmentally linked migration from low-lying Pacific island nations facing sea-level rise.',
      source: 'Source type: UN and Pacific regional migration reports.' }
  ];

  const causeColor = { conflict: '#dc2626', economic: '#ea580c', environmental: '#16a34a' };

  const map = L.map('lf-map', { zoomControl: true, scrollWheelZoom: false, minZoom: 1 }).setView([10, 20], 1);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors', maxZoom: 8
  }).addTo(map);

  function curvedPoints(from, to) {
    const [lat1, lng1] = from, [lat2, lng2] = to;
    const midLat = (lat1 + lat2) / 2, midLng = (lng1 + lng2) / 2;
    const dx = lng2 - lng1, dy = lat2 - lat1;
    const offset = 0.18;
    const ctrlLat = midLat + dx * offset;
    const ctrlLng = midLng - dy * offset;
    const pts = [];
    for (let t = 0; t <= 1; t += 0.05) {
      const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * ctrlLat + t * t * lat2;
      const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * ctrlLng + t * t * lng2;
      pts.push([lat, lng]);
    }
    return pts;
  }

  const lines = flows.map((f) => {
    const line = L.polyline(curvedPoints(f.from, f.to), {
      color: causeColor[f.cause],
      weight: f.magnitude * 1.4,
      opacity: 0.75
    }).addTo(map);
    line.on('click', () => showInfo(f));
    line.on('mouseover', () => line.setStyle({ opacity: 1 }));
    line.on('mouseout', () => line.setStyle({ opacity: 0.75 }));
    L.circleMarker(f.from, { radius: 4, color: '#1e293b', fillColor: '#fff', fillOpacity: 1, weight: 1 }).addTo(map);
    L.circleMarker(f.to, { radius: 4, color: '#1e293b', fillColor: '#1e293b', fillOpacity: 1, weight: 1 }).addTo(map);
    return { flow: f, line };
  });

  const infoControl = L.control({ position: 'topright' });
  infoControl.onAdd = function () {
    this._div = L.DomUtil.create('div', 'info-box');
    this._div.innerHTML = '<h4>Migration Flow Info</h4>Click an arrow for details.';
    return this._div;
  };
  infoControl.addTo(map);

  function showInfo(f) {
    document.querySelector('.info-box').innerHTML =
      '<h4>' + f.name + '</h4>' +
      'Primary cause category: <b>' + f.cause.charAt(0).toUpperCase() + f.cause.slice(1) + '</b><br/>' +
      f.detail + '<br/><small><em>' + f.source + '</em></small>';
  }

  document.querySelectorAll('.lf-filter').forEach((cb) => {
    cb.addEventListener('change', () => {
      const active = Array.from(document.querySelectorAll('.lf-filter')).filter((c) => c.checked).map((c) => c.value);
      lines.forEach(({ flow, line }) => {
        if (active.includes(flow.cause)) {
          map.addLayer(line);
        } else {
          map.removeLayer(line);
        }
      });
    });
  });

  // The map container's final size is not always known at construction time
  // (it was just inserted into the DOM via innerHTML). Force Leaflet to
  // re-measure and reposition every layer once layout has settled.
  setTimeout(() => { map.invalidateSize(); }, 50);
  setTimeout(() => { map.invalidateSize(); }, 300);
});
