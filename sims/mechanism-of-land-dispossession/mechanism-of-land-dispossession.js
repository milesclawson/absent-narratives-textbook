// The Mechanism of Land Dispossession — vis-timeline
// CANVAS_HEIGHT: 540
// Bloom Level: Analyze — examine the causal relationships connecting policy, displacement, redistribution.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .tl-wrap { font-family: Arial, Helvetica, sans-serif; height: 538px; overflow: hidden; background: aliceblue; }
      .tl-header { background: linear-gradient(135deg,#b91c1c,#7f1d1d); padding: 10px 16px; }
      .tl-header h2 { margin:0; font-size:16px; color:#fff; }
      .tl-header p { margin:4px 0 0; font-size:12px; color:#fecaca; }
      .tl-controls { display:flex; justify-content:center; gap:8px; padding:8px; background:#fee2e2; }
      .tl-btn { padding:5px 12px; border:1px solid #94a3b8; border-radius:6px; background:#fff; color:#475569; cursor:pointer; font-size:12px; }
      .tl-btn:hover { background:#f1f5f9; border-color:#b91c1c; }
      #tl-timeline { padding: 10px 60px; background:#fff; }
      .vis-timeline { border:none !important; overflow:visible !important; }
      .vis-panel.vis-center { overflow:visible !important; }
      .vis-item .vis-item-overflow { overflow:visible !important; }
      .vis-item .vis-item-content { white-space:nowrap !important; padding:3px 8px !important; }
      .vis-item.vis-range, .vis-item.vis-box { min-width:fit-content !important; }
      .vis-item { border-radius:5px !important; font-size:11px !important; }
      .vis-item.mechband { background:rgba(249,115,22,0.25) !important; border-color:#f97316 !important; }
      .vis-tooltip { background:#1e293b !important; color:#fff !important; padding:8px 12px !important; border-radius:8px !important; font-size:12px !important; max-width:280px !important; }
      #tl-details { padding: 8px 16px; background:#fee2e2; font-size:12px; color:#334155; min-height: 90px; border-top:1px solid #fecaca; }
      #tl-details .t { font-weight:bold; color:#1e293b; margin-bottom:4px; font-size:13px; }
    </style>
    <div class="tl-wrap">
      <div class="tl-header">
        <h2>The Mechanism of Land Dispossession</h2>
        <p>Indian Removal Act, Trail of Tears, and the Homestead Act as one connected policy chain, 1830-1862</p>
      </div>
      <div class="tl-controls">
        <button class="tl-btn" id="tl-left">&#9664; Earlier</button>
        <button class="tl-btn" id="tl-zoomin">+ Zoom In</button>
        <button class="tl-btn" id="tl-zoomout">- Zoom Out</button>
        <button class="tl-btn" id="tl-fit">Fit All</button>
        <button class="tl-btn" id="tl-right">Later &#9654;</button>
      </div>
      <div id="tl-timeline"></div>
      <div id="tl-details"><div class="t">Click an event for details</div>Hover the orange band or click any event to see how these four moments connect.</div>
    </div>
  `;

  const events = [
    { id: 1, year: 1830, title: 'Indian Removal Act Signed', detail: 'The enabling legislation for two decades of forced removal — this is the policy decision that starts the mechanism.', source: 'Primary source type: statute text.' },
    { id: 2, year: 1838.5, title: 'Trail of Tears', detail: 'The forced relocation of the Cherokee Nation and other Southeastern tribes, during which thousands died from exposure, disease, and starvation.', source: 'Primary source type: period military and missionary correspondence, and documented death-toll estimates.' },
    { id: 3, year: 1848, title: 'Additional Removals Continue', detail: 'Southeastern and Midwestern tribes face continued removal under the same legal framework established in 1830.', source: 'Primary source type: federal removal records.' },
    { id: 4, year: 1862, title: 'Homestead Act Signed', detail: 'Distributes the land vacated by three decades of removal to settler families at minimal cost — explicitly connecting "public domain" land to the removal that made it "available."', source: 'Primary source type: land office records.' }
  ];

  const items = new vis.DataSet([
    { id: 'band', start: new Date(1829, 0, 1), end: new Date(1863, 0, 1), type: 'background', className: 'mechband', content: '' },
    ...events.map((e) => ({ id: e.id, content: e.title, start: new Date(Math.floor(e.year), Math.round((e.year % 1) * 12), 1) }))
  ]);

  const container = document.getElementById('tl-timeline');
  const options = {
    width: '100%',
    height: '220px',
    margin: { item: { horizontal: 50, vertical: 10 }, axis: 40 },
    orientation: 'top',
    zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 80,
    min: new Date(1815, 0, 1),
    max: new Date(1878, 0, 1),
    stack: true,
    selectable: true,
    showCurrentTime: false,
    moveable: true,
    zoomable: false,
    align: 'center'
  };

  const timeline = new vis.Timeline(container, items, options);

  function fitWithPadding() {
    const pad = 4 * 365 * 24 * 60 * 60 * 1000;
    timeline.setWindow(new Date(1829, 0, 1).getTime() - pad, new Date(1863, 0, 1).getTime() + pad, { animation: false });
  }
  fitWithPadding();

  timeline.on('select', function (props) {
    const found = props.items.find((id) => id !== 'band');
    if (found === undefined) return;
    const e = events.find((ev) => ev.id === found);
    document.getElementById('tl-details').innerHTML =
      '<div class="t">' + Math.floor(e.year) + ': ' + e.title + '</div>' + e.detail + '<br/><em>' + e.source + '</em>';
  });

  document.getElementById('tl-timeline').addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('mechband')) {
      document.getElementById('tl-details').innerHTML =
        '<div class="t">Land Dispossession Mechanism</div>These four moments are one connected policy chain: removal policy authorized displacement, displacement vacated land, and redistribution legislation transferred that land to settlers — not three unrelated events.';
    }
  }, true);

  document.getElementById('tl-left').addEventListener('click', () => {
    const r = timeline.getWindow(); const iv = (r.end - r.start) * 0.3;
    timeline.setWindow(r.start - iv, r.end - iv);
  });
  document.getElementById('tl-right').addEventListener('click', () => {
    const r = timeline.getWindow(); const iv = (r.end - r.start) * 0.3;
    timeline.setWindow(r.start.valueOf() + iv, r.end.valueOf() + iv);
  });
  document.getElementById('tl-zoomin').addEventListener('click', () => {
    const r = timeline.getWindow(); const c = (r.start.getTime() + r.end.getTime()) / 2; const iv = (r.end - r.start) * 0.5;
    timeline.setWindow(c - iv / 2, c + iv / 2);
  });
  document.getElementById('tl-zoomout').addEventListener('click', () => {
    const r = timeline.getWindow(); const c = (r.start.getTime() + r.end.getTime()) / 2; const iv = (r.end - r.start) * 2;
    timeline.setWindow(c - iv / 2, c + iv / 2);
  });
  document.getElementById('tl-fit').addEventListener('click', fitWithPadding);

  container.addEventListener('wheel', function (e) {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!isHorizontal) {
      e.stopImmediatePropagation();
    } else {
      e.preventDefault();
      const win = timeline.getWindow();
      const interval = win.end - win.start;
      const shift = (e.deltaX / container.clientWidth) * interval;
      timeline.setWindow(new Date(win.start.valueOf() + shift), new Date(win.end.valueOf() + shift), { animation: false });
    }
  }, true);
});
