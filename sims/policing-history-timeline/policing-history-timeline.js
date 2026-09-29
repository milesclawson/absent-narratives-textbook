// Policing History Timeline — vis-timeline
// CANVAS_HEIGHT: 560
// Bloom Level: Understand — summarize major institutional shifts in American policing history.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .tl-wrap { font-family: Arial, Helvetica, sans-serif; height: 558px; overflow: hidden; background: aliceblue; }
      .tl-header { background: linear-gradient(135deg,#334155,#0f172a); padding: 10px 16px; }
      .tl-header h2 { margin:0; font-size:16px; color:#fff; }
      .tl-header p { margin:4px 0 0; font-size:12px; color:#cbd5e1; }
      .tl-controls { display:flex; justify-content:center; gap:8px; padding:8px; background:#e2e8f0; }
      .tl-btn { padding:5px 12px; border:1px solid #94a3b8; border-radius:6px; background:#fff; color:#475569; cursor:pointer; font-size:12px; }
      .tl-btn:hover { background:#f1f5f9; border-color:#334155; }
      #tl-timeline { padding: 10px 50px; background:#fff; }
      .vis-timeline { border:none !important; overflow:visible !important; }
      .vis-panel.vis-center { overflow:visible !important; }
      .vis-item .vis-item-overflow { overflow:visible !important; }
      .vis-item .vis-item-content { white-space:nowrap !important; padding:3px 8px !important; }
      .vis-item.vis-range, .vis-item.vis-box { min-width:fit-content !important; }
      .vis-item.evt { border-radius:5px !important; font-size:10.5px !important; background:#1e293b !important; color:#fff !important; border-color:#0f172a !important; }
      .vis-item.era1 { background: rgba(153,27,27,0.18) !important; }
      .vis-item.era2 { background: rgba(180,83,9,0.18) !important; }
      .vis-item.era3 { background: rgba(21,128,61,0.18) !important; }
      .vis-item.era4 { background: rgba(30,64,175,0.18) !important; }
      .vis-item.era5 { background: rgba(107,33,168,0.18) !important; }
      .vis-tooltip { background:#1e293b !important; color:#fff !important; padding:8px 12px !important; border-radius:8px !important; font-size:12px !important; max-width:280px !important; }
      #tl-details { padding: 8px 16px; background:#e2e8f0; font-size:12px; color:#334155; min-height: 80px; border-top:1px solid #cbd5e1; }
      #tl-details .t { font-weight:bold; color:#1e293b; margin-bottom:4px; font-size:13px; }
    </style>
    <div class="tl-wrap">
      <div class="tl-header">
        <h2>Policing History Timeline</h2>
        <p>The documented institutional evolution of American policing, 1700s-present</p>
      </div>
      <div class="tl-controls">
        <button class="tl-btn" id="tl-left">&#9664; Earlier</button>
        <button class="tl-btn" id="tl-zoomin">+ Zoom In</button>
        <button class="tl-btn" id="tl-zoomout">- Zoom Out</button>
        <button class="tl-btn" id="tl-fit">Fit All</button>
        <button class="tl-btn" id="tl-right">Later &#9654;</button>
      </div>
      <div id="tl-timeline"></div>
      <div id="tl-details"><div class="t">Click an event for details</div>Click any marker to see its documented source type.</div>
    </div>
  `;

  const events = [
    { id: 1, year: 1750, title: 'Slave Patrols (1700s-1865)', detail: 'Organized slave patrols in Southern colonies and states are among the earliest organized policing institutions in the region.', source: 'Primary source type: state slave-code statutes.' },
    { id: 2, year: 1838, title: 'Boston Police Founded (1838-1900s)', detail: 'Professional municipal police departments form, with primarily order-maintenance and property-protection origins.', source: 'Primary source type: municipal founding charters and records.' },
    { id: 3, year: 1965, title: 'Civil Rights Era Confrontations (1960s-70s)', detail: 'Widely documented confrontations between police and civil rights protesters, captured on film and in news photography.', source: 'Primary source type: contemporary news film and photography.' },
    { id: 4, year: 1980, title: '"War on Drugs" Policy Shift (1970s-90s)', detail: 'Policy shifts connect drug enforcement to sentencing policy — detailed further later in this chapter.', source: 'Primary source type: federal and state drug policy legislation.' },
    { id: 5, year: 1995, title: '"Broken Windows" Policing (1990s-2000s)', detail: 'Rise of zero-tolerance and "broken windows" policing strategies targeting minor offenses.', source: 'Primary source type: department policy manuals and criminology publications of the era.' },
    { id: 6, year: 2015, title: 'Body Camera Adoption (2010s-present)', detail: 'Body camera adoption and community-policing reform efforts follow widely documented incidents.', source: 'Primary source type: department policy adoption records and post-incident reports.' }
  ];

  const eras = [
    { className: 'era1', start: 1700, end: 1865 },
    { className: 'era2', start: 1865, end: 1960 },
    { className: 'era3', start: 1960, end: 1975 },
    { className: 'era4', start: 1975, end: 2000 },
    { className: 'era5', start: 2000, end: 2026 }
  ];

  const bgItems = eras.map((e, i) => ({
    id: 'era' + i, type: 'background', className: e.className,
    start: new Date(e.start, 0, 1), end: new Date(e.end, 0, 1)
  }));
  const evtItems = events.map((e) => ({ id: e.id, content: e.title, start: new Date(e.year, 0, 1), className: 'evt' }));

  const items = new vis.DataSet([...bgItems, ...evtItems]);

  const container = document.getElementById('tl-timeline');
  const options = {
    width: '100%',
    height: '230px',
    margin: { item: { horizontal: 50, vertical: 10 }, axis: 40 },
    orientation: 'top',
    zoomMin: 1000 * 60 * 60 * 24 * 365 * 15,
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 400,
    min: new Date(1680, 0, 1),
    max: new Date(2035, 0, 1),
    stack: true,
    selectable: true,
    showCurrentTime: false,
    moveable: true,
    zoomable: false,
    align: 'center'
  };

  const timeline = new vis.Timeline(container, items, options);

  function fitWithPadding() {
    timeline.setWindow(new Date(1690, 0, 1), new Date(2030, 0, 1), { animation: false });
  }
  fitWithPadding();

  timeline.on('select', function (props) {
    const found = props.items.find((id) => typeof id === 'number');
    if (found === undefined) return;
    const e = events.find((ev) => ev.id === found);
    document.getElementById('tl-details').innerHTML =
      '<div class="t">' + e.year + ': ' + e.title + '</div>' + e.detail + '<br/><em>' + e.source + '</em>';
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
