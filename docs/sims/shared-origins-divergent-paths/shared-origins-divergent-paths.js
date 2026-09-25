// Shared Origins, Divergent Paths — vis-timeline
// CANVAS_HEIGHT: 540
// Bloom Level: Understand — explain the historical/chronological relationship among three traditions.
// Framing note: strictly historical/documentary throughout — no claim about theological truth.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .tl-wrap { font-family: Arial, Helvetica, sans-serif; height: 538px; overflow: hidden; background: aliceblue; }
      .tl-header { background: linear-gradient(135deg,#7c3aed,#4c1d95); padding: 10px 16px; }
      .tl-header h2 { margin:0; font-size:16px; color:#fff; }
      .tl-header p { margin:4px 0 0; font-size:12px; color:#ede9fe; }
      .tl-controls { display:flex; justify-content:center; gap:8px; padding:8px; background:#ede9fe; }
      .tl-btn { padding:5px 12px; border:1px solid #94a3b8; border-radius:6px; background:#fff; color:#475569; cursor:pointer; font-size:12px; }
      .tl-btn:hover { background:#f5f3ff; border-color:#7c3aed; }
      #tl-timeline { padding: 10px 55px; background:#fff; }
      .vis-timeline { border:none !important; overflow:visible !important; }
      .vis-panel.vis-center { overflow:visible !important; }
      .vis-item .vis-item-overflow { overflow:visible !important; }
      .vis-item .vis-item-content { white-space:nowrap !important; padding:3px 8px !important; }
      .vis-item.vis-range, .vis-item.vis-box { min-width:fit-content !important; }
      .vis-item.evt { border-radius:5px !important; font-size:10.5px !important; background:#1e293b !important; color:#fff !important; border-color:#0f172a !important; }
      .vis-item.jband { background:rgba(37,99,235,0.15) !important; }
      .vis-item.cband { background:rgba(22,163,74,0.15) !important; }
      .vis-item.iband { background:rgba(217,119,6,0.15) !important; }
      .vis-tooltip { background:#1e293b !important; color:#fff !important; padding:8px 12px !important; border-radius:8px !important; font-size:12px !important; max-width:280px !important; }
      #tl-details { padding: 8px 16px; background:#ede9fe; font-size:12px; color:#334155; min-height: 80px; border-top:1px solid #ddd6fe; }
      #tl-details .t { font-weight:bold; color:#1e293b; margin-bottom:4px; font-size:13px; }
    </style>
    <div class="tl-wrap">
      <div class="tl-header">
        <h2>Shared Origins, Divergent Paths</h2>
        <p>The historical chronology of Judaism, Christianity, and Islam — dates and documented events only</p>
      </div>
      <div class="tl-controls">
        <button class="tl-btn" id="tl-left">&#9664; Earlier</button>
        <button class="tl-btn" id="tl-zoomin">+ Zoom In</button>
        <button class="tl-btn" id="tl-zoomout">- Zoom Out</button>
        <button class="tl-btn" id="tl-fit">Fit All</button>
        <button class="tl-btn" id="tl-right">Later &#9654;</button>
      </div>
      <div id="tl-timeline"></div>
      <div id="tl-details"><div class="t">Click an event for details</div>Blue = Judaism's span, green = Christianity's span, gold = Islam's span. Click any event marker for a historical detail.</div>
    </div>
  `;

  function dateForYear(year) {
    const d = new Date(0, 0, 1);
    d.setFullYear(year);
    return d;
  }

  const events = [
    { id: 1, year: -1800, title: 'Traditional Dating of Abraham', detail: 'The patriarch Abraham, traditionally dated to this period, is the shared ancestral figure across all three traditions.', source: 'Source type: textual and archaeological historiography (dates traditional, not independently verified).' },
    { id: 2, year: -1200, title: 'Israelite Exodus Narrative', detail: 'Traditional dating of the Exodus narrative and the early formation of Judaism.', source: 'Source type: textual historiography.' },
    { id: 3, year: 30, title: 'Jesus of Nazareth', detail: 'The life and teachings of Jesus of Nazareth take place within the context of Second Temple Judaism.', source: 'Source type: textual and historiographical sources from the period and shortly after.' },
    { id: 4, year: 100, title: 'Christianity Becomes Distinct', detail: 'Christianity grows into a religious community increasingly distinct from Judaism.', source: 'Source type: early Christian and Jewish textual sources.' },
    { id: 5, year: 620, title: 'Prophetic Career of Muhammad (610-632 CE)', detail: 'The prophetic career of Muhammad in Mecca and Medina establishes the foundations of Islam.', source: 'Source type: early Islamic textual historiography.' },
    { id: 6, year: 632, title: 'Early Spread of Islam', detail: 'Islam spreads across the Arabian Peninsula and beyond beginning in this period.', source: 'Source type: early historical chronicles.' }
  ];

  const bands = [
    { className: 'jband', start: -1800, end: 700 },
    { className: 'cband', start: 30, end: 700 },
    { className: 'iband', start: 610, end: 700 }
  ];

  const items = new vis.DataSet([
    ...bands.map((b, i) => ({ id: 'band' + i, type: 'background', className: b.className, start: dateForYear(b.start), end: dateForYear(b.end) })),
    ...events.map((e) => ({ id: e.id, content: e.title, start: dateForYear(e.year), className: 'evt' }))
  ]);

  const container = document.getElementById('tl-timeline');
  const options = {
    width: '100%',
    height: '220px',
    margin: { item: { horizontal: 50, vertical: 10 }, axis: 40 },
    orientation: 'top',
    zoomMin: 1000 * 60 * 60 * 24 * 365 * 40,
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 3000,
    min: dateForYear(-2000),
    max: dateForYear(800),
    stack: true,
    selectable: true,
    showCurrentTime: false,
    moveable: true,
    zoomable: false,
    align: 'center'
  };

  const timeline = new vis.Timeline(container, items, options);

  function fitWithPadding() {
    timeline.setWindow(dateForYear(-1900), dateForYear(750), { animation: false });
  }
  fitWithPadding();

  timeline.on('select', function (props) {
    const found = props.items.find((id) => typeof id === 'number');
    if (found === undefined) return;
    const e = events.find((ev) => ev.id === found);
    const yearLabel = e.year < 0 ? Math.abs(e.year) + ' BCE' : e.year + ' CE';
    document.getElementById('tl-details').innerHTML =
      '<div class="t">' + yearLabel + ': ' + e.title + '</div>' + e.detail + '<br/><em>' + e.source + '</em>';
  });

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
