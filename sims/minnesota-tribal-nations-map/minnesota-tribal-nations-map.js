// Minnesota Tribal Nations Map — Leaflet
// CANVAS_HEIGHT: 560
// Bloom Level: Remember — identify Minnesota's tribal nations and their locations.
// Data note: marker locations approximate each nation's real reservation/trust-land area.
// Circle sizes are illustrative, not survey-grade boundaries.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .lf-wrap { font-family: Arial, Helvetica, sans-serif; height: 558px; overflow:hidden; background:aliceblue; }
      .lf-header { text-align:center; padding:8px; }
      .lf-header h2 { margin:0; font-size:16px; color:#222; }
      .lf-header p { margin:2px 0 0; font-size:11px; color:#666; }
      #lf-map { width:100%; height:380px; }
      .lf-controls { display:flex; align-items:center; justify-content:center; gap:16px; padding:8px; background:#ecfdf5; font-size:12px; }
      .lf-legend { display:flex; justify-content:center; gap:16px; padding:6px; background:#fff; font-size:12px; border-top:1px solid #ddd; }
      .lf-swatch { width:14px; height:14px; display:inline-block; border-radius:50%; margin-right:4px; vertical-align:middle; }
      .lf-note { padding:4px 12px; font-size:10px; color:#888; text-align:center; font-style:italic; }
      .info-box { background: rgba(255,255,255,0.97); padding:8px 10px; border-radius:6px; box-shadow:0 1px 6px rgba(0,0,0,0.25); font-size:12px; max-width:230px; }
      .info-box h4 { margin:0 0 4px; font-size:13px; }
    </style>
    <div class="lf-wrap">
      <div class="lf-header">
        <h2>Minnesota Tribal Nations</h2>
        <p>Eleven federally recognized tribal nations with reservations or trust land in Minnesota</p>
      </div>
      <div id="lf-map"></div>
      <div class="lf-controls">
        <label><input type="checkbox" id="lf-historical"> Show Historical Territory (illustrative)</label>
      </div>
      <div class="lf-legend">
        <span><span class="lf-swatch" style="background:#16a34a"></span>Ojibwe (Anishinaabe) Nations</span>
        <span><span class="lf-swatch" style="background:#2563eb"></span>Dakota Nations</span>
      </div>
      <div class="lf-note">Marker locations approximate each nation's present-day reservation/trust land. Circle size is illustrative, not a survey boundary — the historical-territory toggle uses an illustrative larger radius, not documented historical boundaries.</div>
    </div>
  `;

  const nations = [
    { name: 'Red Lake Nation', native: 'Miskwaagamiiwi-zaaga\'iganing', lat: 47.9, lng: -95.02, group: 'ojibwe',
      gov: 'Closed reservation — land held communally, not allotted; own tribal court and government.' },
    { name: 'White Earth Nation', native: 'Gaa-waabaabiganikaag', lat: 47.13, lng: -95.75, group: 'ojibwe',
      gov: 'Largest reservation by land area in Minnesota; elected Tribal Council government.' },
    { name: 'Leech Lake Band of Ojibwe', native: 'Gaa-zagaskwaajimekaag', lat: 47.27, lng: -94.2, group: 'ojibwe',
      gov: 'Member of the Minnesota Chippewa Tribe; elected Reservation Business Committee.' },
    { name: 'Mille Lacs Band of Ojibwe', native: 'Misi-zaaga\'iganing', lat: 46.13, lng: -93.65, group: 'ojibwe',
      gov: 'Retains treaty-protected hunting and fishing rights affirmed by the U.S. Supreme Court in 1999.' },
    { name: 'Fond du Lac Band', native: 'Nagaajiwanaang', lat: 46.68, lng: -92.55, group: 'ojibwe',
      gov: 'Member of the Minnesota Chippewa Tribe; co-manages natural resources with state agencies.' },
    { name: 'Grand Portage Band', native: 'Gichi-onigaming', lat: 47.96, lng: -89.68, group: 'ojibwe',
      gov: 'Northernmost Minnesota reservation, on the Lake Superior shore near the Canadian border.' },
    { name: 'Bois Forte Band', native: 'Zagaakwaandagowininiwag', lat: 47.85, lng: -92.9, group: 'ojibwe',
      gov: 'Member of the Minnesota Chippewa Tribe; Nett Lake is its primary community.' },
    { name: 'Prairie Island Indian Community', native: 'Tinta Winte', lat: 44.65, lng: -92.65, group: 'dakota',
      gov: 'Federally recognized Dakota community; own elected Tribal Council.' },
    { name: 'Shakopee Mdewakanton Sioux Community', native: 'Mdewakanton', lat: 44.75, lng: -93.5, group: 'dakota',
      gov: 'Federally recognized Dakota community with its own General Council government.' },
    { name: 'Lower Sioux Indian Community', native: 'Cansa\'yapi', lat: 44.4, lng: -94.98, group: 'dakota',
      gov: 'Federally recognized Dakota community; own elected Community Council.' },
    { name: 'Upper Sioux Community', native: 'Pezihutazizi Oyate', lat: 44.68, lng: -95.55, group: 'dakota',
      gov: 'Federally recognized Dakota community; own elected Board of Trustees.' }
  ];

  const groupColor = { ojibwe: '#16a34a', dakota: '#2563eb' };

  const map = L.map('lf-map', { zoomControl: true, scrollWheelZoom: false }).setView([46.7, -94.2], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors', maxZoom: 12
  }).addTo(map);

  const historicalCheckbox = document.getElementById('lf-historical');

  const circles = nations.map((n) => {
    const c = L.circle([n.lat, n.lng], {
      radius: 9000,
      color: '#1e293b',
      weight: 1.5,
      fillColor: groupColor[n.group],
      fillOpacity: 0.75
    }).addTo(map);
    c.on('click', () => showInfo(n));
    return c;
  });

  const infoControl = L.control({ position: 'topright' });
  infoControl.onAdd = function () {
    this._div = L.DomUtil.create('div', 'info-box');
    this._div.innerHTML = '<h4>Tribal Nation Info</h4>Click a marker for details.';
    return this._div;
  };
  infoControl.addTo(map);

  function showInfo(n) {
    document.querySelector('.info-box').innerHTML =
      '<h4>' + n.name + '</h4>' +
      'Name in own language: <i>' + n.native + '</i><br/>' +
      'Language family: <b>' + (n.group === 'ojibwe' ? 'Ojibwe (Anishinaabemowin)' : 'Dakota (Dakhótiyapi)') + '</b><br/>' +
      '<small>' + n.gov + '</small><br/>' +
      '<small><em>See the nation\'s official tribal government website for authoritative information.</em></small>';
  }

  historicalCheckbox.addEventListener('change', () => {
    const showHist = historicalCheckbox.checked;
    circles.forEach((c) => c.setRadius(showHist ? 60000 : 9000));
    if (showHist) {
      document.querySelector('.info-box').innerHTML =
        '<h4>Historical Territory (illustrative)</h4>The enlarged circles are illustrative only, showing that documented historical territories were far larger than present-day reservation and trust land — connecting to Chapter 4\'s land dispossession content. They are not precise historical boundaries.';
    }
  });

  // Container size may not be final at construction time (just inserted via innerHTML).
  setTimeout(() => { map.invalidateSize(); }, 50);
  setTimeout(() => { map.invalidateSize(); }, 300);
});
