// From Slavery to Desegregation — A Traceable Chain — vis-timeline
// CANVAS_HEIGHT: 550
// Bloom Level: Understand — summarize the causal chain connecting four historical periods.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .tl-wrap { font-family: Arial, Helvetica, sans-serif; height: 548px; overflow: hidden; background: aliceblue; }
      .tl-header { background: linear-gradient(135deg,#4b5563,#1f2937); padding: 10px 16px; }
      .tl-header h2 { margin:0; font-size:16px; color:#fff; }
      .tl-header p { margin:4px 0 0; font-size:12px; color:#e5e7eb; }
      .tl-controls { display:flex; justify-content:center; gap:8px; padding:8px; background:#f1f5f9; }
      .tl-btn { padding:5px 12px; border:1px solid #94a3b8; border-radius:6px; background:#fff; color:#475569; cursor:pointer; font-size:12px; }
      .tl-btn:hover { background:#e2e8f0; border-color:#334155; }
      #tl-timeline { padding: 10px 55px; background:#fff; }
      .vis-timeline { border:none !important; overflow:visible !important; }
      .vis-panel.vis-center { overflow:visible !important; }
      .vis-item .vis-item-overflow { overflow:visible !important; }
      .vis-item .vis-item-content { white-space:nowrap !important; padding:3px 8px !important; }
      .vis-item.vis-range, .vis-item.vis-box { min-width:fit-content !important; }
      .vis-item.evt { border-radius:5px !important; font-size:10.5px !important; }
      .vis-item.gray { background:#e5e7eb !important; border-color:#6b7280 !important; }
      .vis-item.green { background:#bbf7d0 !important; border-color:#16a34a !important; }
      .vis-item.blue { background:#bfdbfe !important; border-color:#2563eb !important; }
      .vis-item.reversalband { background:rgba(220,38,38,0.16) !important; }
      .vis-tooltip { background:#1e293b !important; color:#fff !important; padding:8px 12px !important; border-radius:8px !important; font-size:12px !important; max-width:280px !important; }
      #tl-details { padding: 8px 16px; background:#f1f5f9; font-size:12px; color:#334155; min-height: 80px; border-top:1px solid #e2e8f0; }
      #tl-details .t { font-weight:bold; color:#1e293b; margin-bottom:4px; font-size:13px; }
    </style>
    <div class="tl-wrap">
      <div class="tl-header">
        <h2>From Slavery to Desegregation: A Traceable Chain</h2>
        <p>Jim Crow as a documented reversal of Reconstruction gains, 1865-1968</p>
      </div>
      <div class="tl-controls">
        <button class="tl-btn" id="tl-left">&#9664; Earlier</button>
        <button class="tl-btn" id="tl-zoomin">+ Zoom In</button>
        <button class="tl-btn" id="tl-zoomout">- Zoom Out</button>
        <button class="tl-btn" id="tl-fit">Fit All</button>
        <button class="tl-btn" id="tl-right">Later &#9654;</button>
      </div>
      <div id="tl-timeline"></div>
      <div id="tl-details"><div class="t">Click an event for details</div>The shaded red band marks the Jim Crow "Reversal Period" — hover it or click an event.</div>
    </div>
  `;

  const events = [
    { id: 1, year: 1865, title: '13th Amendment Ratified', detail: 'Formally abolishes slavery — but the "legacy of slavery" persists despite formal abolition, as later events on this timeline show.', source: 'Primary source type: constitutional amendment text.', cls: 'gray' },
    { id: 2, year: 1871, title: 'Reconstruction Era (1865-1877)', detail: 'Documented gains include Black elected officials and the 14th and 15th Amendments — ending with federal troop withdrawal in 1877.', source: 'Primary source type: Reconstruction-era legislative and election records.', cls: 'green' },
    { id: 3, year: 1954, title: 'Brown v. Board of Education', detail: 'The Supreme Court rules school segregation unconstitutional, beginning the legal dismantling of Jim Crow.', source: 'Primary source type: Supreme Court opinion.', cls: 'blue' },
    { id: 4, year: 1961, title: 'Civil Rights Movement Peak (1955-1968)', detail: 'Sustained organizing connects directly to nonviolent resistance and grassroots organizing, covered later in this chapter.', source: 'Primary source type: movement organizational records and contemporary journalism.', cls: 'blue' },
    { id: 5, year: 1964.5, title: 'Civil Rights Act (1964) & Voting Rights Act (1965)', detail: 'Landmark federal legislation curtails the Jim Crow-era tools of exclusion documented in this chapter.', source: 'Primary source type: statute text.', cls: 'blue' }
  ];

  const items = new vis.DataSet([
    { id: 'band', type: 'background', className: 'reversalband', start: new Date(1877, 0, 1), end: new Date(1955, 0, 1), content: 'Reversal Period' },
    ...events.map((e) => ({ id: e.id, content: e.title, start: new Date(Math.floor(e.year), Math.round((e.year % 1) * 12), 1), className: 'evt ' + e.cls }))
  ]);

  const container = document.getElementById('tl-timeline');
  const options = {
    width: '100%',
    height: '220px',
    margin: { item: { horizontal: 50, vertical: 10 }, axis: 40 },
    orientation: 'top',
    zoomMin: 1000 * 60 * 60 * 24 * 365 * 8,
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 150,
    min: new Date(1855, 0, 1),
    max: new Date(1980, 0, 1),
    stack: true,
    selectable: true,
    showCurrentTime: false,
    moveable: true,
    zoomable: false,
    align: 'center'
  };

  const timeline = new vis.Timeline(container, items, options);

  function fitWithPadding() {
    timeline.setWindow(new Date(1860, 0, 1), new Date(1972, 0, 1), { animation: false });
  }
  fitWithPadding();

  timeline.on('select', function (props) {
    const found = props.items.find((id) => typeof id === 'number');
    if (found === undefined) {
      if (props.items.includes('band')) {
        document.getElementById('tl-details').innerHTML =
          '<div class="t">Reversal Period (1877-1950s)</div>Jim Crow segregation laws actively reversed specific Reconstruction-era gains — Black elected officials, federal enforcement of civil rights — rather than simply continuing the conditions of slavery unchanged.';
      }
      return;
    }
    const e = events.find((ev) => ev.id === found);
    document.getElementById('tl-details').innerHTML =
      '<div class="t">' + Math.floor(e.year) + ': ' + e.title + '</div>' + e.detail + '<br/><em>' + e.source + '</em>';
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
