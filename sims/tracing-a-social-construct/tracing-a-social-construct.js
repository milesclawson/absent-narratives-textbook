// Tracing a Social Construct — vis-timeline
// CANVAS_HEIGHT: 560
// Bloom Level: Understand — explain how a legal category changed over a documented period.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .tl-wrap { font-family: Arial, Helvetica, sans-serif; height: 558px; overflow: hidden; background: aliceblue; }
      .tl-header { background: linear-gradient(135deg,#3b82f6,#1d4ed8); padding: 10px 16px; }
      .tl-header h2 { margin:0; font-size:17px; color:#fff; }
      .tl-header p { margin:4px 0 0; font-size:12px; color:#dbeafe; }
      .tl-controls { display:flex; justify-content:center; gap:8px; padding:8px; background:#e0f2fe; }
      .tl-btn { padding:5px 12px; border:1px solid #94a3b8; border-radius:6px; background:#fff; color:#475569; cursor:pointer; font-size:12px; }
      .tl-btn:hover { background:#f1f5f9; border-color:#3b82f6; }
      #tl-timeline { padding: 10px 60px; background:#fff; }
      .vis-timeline { border:none !important; overflow:visible !important; }
      .vis-panel.vis-center { overflow:visible !important; }
      .vis-item .vis-item-overflow { overflow:visible !important; }
      .vis-item .vis-item-content { white-space:nowrap !important; padding:3px 8px !important; }
      .vis-item.vis-range, .vis-item.vis-box { min-width:fit-content !important; }
      .vis-item { border-radius:5px !important; font-size:11px !important; }
      .vis-tooltip { background:#1e293b !important; color:#fff !important; padding:8px 12px !important; border-radius:8px !important; font-size:12px !important; max-width:280px !important; }
      #tl-details { padding: 8px 16px; background:#e0f2fe; font-size:12px; color:#334155; min-height: 90px; border-top:1px solid #bae6fd; }
      #tl-details .t { font-weight:bold; color:#1e293b; margin-bottom:4px; font-size:13px; }
    </style>
    <div class="tl-wrap">
      <div class="tl-header">
        <h2>Tracing a Social Construct: Who Counted as "White"?</h2>
        <p>How the legal category "white" changed in U.S. law, 1790-1965</p>
      </div>
      <div class="tl-controls">
        <button class="tl-btn" id="tl-left">&#9664; Earlier</button>
        <button class="tl-btn" id="tl-zoomin">+ Zoom In</button>
        <button class="tl-btn" id="tl-zoomout">- Zoom Out</button>
        <button class="tl-btn" id="tl-fit">Fit All</button>
        <button class="tl-btn" id="tl-right">Later &#9654;</button>
      </div>
      <div id="tl-timeline"></div>
      <div id="tl-details"><div class="t">Click an event for details</div>Click any marker on the timeline above to see its historical detail here.</div>
    </div>
  `;

  const events = [
    { id: 1, year: 1790, title: 'Naturalization Act of 1790', detail: 'Restricts U.S. citizenship to "free white persons." The law never defines "white," leaving its boundaries to later courts and administrators.', source: 'Primary source type: statute text.' },
    { id: 2, year: 1845, title: 'Irish Immigrants and Contested Whiteness', detail: 'Irish immigrants held legal whiteness but faced widespread social exclusion from full "white" status in employment and housing.', source: 'Primary source type: period newspaper cartoons and employment notices.' },
    { id: 3, year: 1882, title: 'Chinese Exclusion Act', detail: 'Explicitly denies naturalization to Chinese immigrants, connecting racial and national-origin exclusion directly.', source: 'Primary source type: statute text.' },
    { id: 4, year: 1923, title: 'U.S. v. Bhagat Singh Thind', detail: 'The Supreme Court rules South Asian immigrants are not "white" for naturalization purposes, despite some period anthropological classifications saying otherwise — showing the category shifting to fit a desired outcome.', source: 'Primary source type: Supreme Court opinion.' },
    { id: 5, year: 1935, title: 'Federal Housing Policy Begins Reclassifying', detail: 'New federal lending policy begins treating Italian and Jewish immigrants as "white" for mortgage purposes in ways it had not previously — detailed further in Chapter 6.', source: 'Primary source type: federal housing agency records.' },
    { id: 6, year: 1965, title: 'Immigration and Nationality Act', detail: 'Removes national-origin quotas from U.S. immigration law, changing which groups could immigrate at all.', source: 'Primary source type: statute text.' }
  ];

  const items = new vis.DataSet(events.map((e) => ({
    id: e.id,
    content: e.title,
    start: new Date(e.year, 0, 1),
    className: (e.id === 3 || e.id === 4) ? 'excl' : 'incl'
  })));

  const container = document.getElementById('tl-timeline');
  const options = {
    width: '100%',
    height: '220px',
    margin: { item: { horizontal: 50, vertical: 10 }, axis: 40 },
    orientation: 'top',
    zoomMin: 1000 * 60 * 60 * 24 * 365 * 10,
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 250,
    min: new Date(1770, 0, 1),
    max: new Date(1985, 0, 1),
    stack: true,
    selectable: true,
    showCurrentTime: false,
    moveable: true,
    zoomable: false,
    align: 'center'
  };

  const timeline = new vis.Timeline(container, items, options);

  const styleTag = document.createElement('style');
  styleTag.textContent = '.vis-item.excl { background:#fecaca !important; border-color:#dc2626 !important; } .vis-item.incl { background:#bbf7d0 !important; border-color:#16a34a !important; }';
  document.head.appendChild(styleTag);

  function fitWithPadding() {
    const ts = events.map((e) => new Date(e.year, 0, 1).getTime());
    const minD = Math.min(...ts), maxD = Math.max(...ts);
    const pad = 8 * 365 * 24 * 60 * 60 * 1000;
    timeline.setWindow(new Date(minD - pad), new Date(maxD + pad), { animation: false });
  }
  fitWithPadding();

  timeline.on('select', function (props) {
    if (!props.items.length) return;
    const e = events.find((ev) => ev.id === props.items[0]);
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
