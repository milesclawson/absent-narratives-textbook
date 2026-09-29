// Four Layers of Government Representation — vis-network
// CANVAS_HEIGHT: 480
// Bloom Level: Understand — explain the relationship between tribal sovereignty and other levels of government.
document.addEventListener('DOMContentLoaded', function () {
  // vis-network's navigation button icons require this stylesheet, which the
  // scaffolded main.html does not load by default (JS-only CDN script).
  const visCss = document.createElement('link');
  visCss.rel = 'stylesheet';
  visCss.href = 'https://unpkg.com/vis-network/styles/vis-network.min.css';
  document.head.appendChild(visCss);

  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .vn-wrap { position:relative; height:478px; font-family: Arial, Helvetica, sans-serif; background:aliceblue; }
      #vn-network { position:absolute; top:0; left:0; right:280px; bottom:0; }
      .vn-title { position:absolute; top:8px; left:50%; transform:translateX(-50%); font-size:16px; font-weight:bold; color:#1e293b; z-index:5; }
      .vn-legend { position:absolute; top:36px; left:10px; background:rgba(255,255,255,0.95); border-radius:6px; padding:6px 10px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15); z-index:5; }
      .vn-legend div { margin:2px 0; }
      .vn-dot { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; }
      .vn-panel { position:absolute; top:0; right:0; width:270px; bottom:0; background:#fff; border-left:1px solid #cbd5e1; padding:10px; font-size:12px; overflow:auto; }
      .vn-panel h4 { margin:0 0 6px; font-size:13px; color:#1e293b; }
    </style>
    <div class="vn-wrap">
      <div class="vn-title">Four Layers of Government Representation</div>
      <div class="vn-legend">
        <div><span class="vn-dot" style="background:#3b82f6"></span>Federal</div>
        <div><span class="vn-dot" style="background:#f97316"></span>State / Local</div>
        <div><span class="vn-dot" style="background:#16a34a"></span>Tribal Nation</div>
      </div>
      <div id="vn-network"></div>
      <div class="vn-panel" id="vn-panel"><h4>Node / Edge Details</h4>Hover or click any node or edge for details.</div>
    </div>
  `;

  const nodeInfo = {
    federal: 'Federal Government: the national U.S. government, holding constitutional authority delegated to states and maintaining a direct nation-to-nation relationship with tribal nations.',
    state: 'State Government: holds authority delegated by the federal constitutional framework, and in turn delegates authority to local governments. Has only a limited consultation relationship with tribal nations, not general authority over them.',
    local: 'Local Government: city and county governments, operating under authority delegated by the state.',
    tribal: 'Tribal Nation: holds inherent, pre-existing sovereign authority, not granted by the federal government — connected directly to the federal government through a nation-to-nation relationship, not through the state.'
  };

  const edgeInfo = {
    e1: 'Constitutional Authority: the U.S. Constitution establishes federal authority, which states operate within.',
    e2: 'Delegated Authority: states delegate specific governing authority to local governments (cities, counties).',
    e3: 'Nation-to-Nation Relationship: a direct, government-to-government relationship between the federal government and tribal nations, conducted through treaties and direct negotiation — not a delegation relationship, and not routed through the state.',
    e4: 'Consultation Requirement: tribal nations and states interact on specific, limited matters (such as shared natural resources), but this is not general state authority over tribal nations.'
  };

  const nodes = new vis.DataSet([
    { id: 'federal', label: 'Federal\nGovernment', x: 0, y: -180, color: { background: '#3b82f6', border: '#1e3a8a' }, font: { color: '#fff', size: 16 }, shape: 'ellipse', size: 34 },
    { id: 'state', label: 'State\nGovernment', x: -100, y: -20, color: { background: '#f97316', border: '#7c2d12' }, font: { color: '#fff', size: 15 }, shape: 'ellipse', size: 28 },
    { id: 'local', label: 'Local\nGovernment', x: -100, y: 130, color: { background: '#f97316', border: '#7c2d12' }, font: { color: '#fff', size: 13 }, shape: 'ellipse', size: 22 },
    { id: 'tribal', label: 'Tribal\nNation', x: 130, y: -20, color: { background: '#16a34a', border: '#14532d' }, font: { color: '#fff', size: 15 }, shape: 'ellipse', size: 28 }
  ]);

  const edges = new vis.DataSet([
    { id: 'e1', from: 'federal', to: 'state', arrows: 'to', color: { color: '#1e293b' }, width: 2, label: 'Constitutional\nAuthority', font: { size: 10, align: 'middle' } },
    { id: 'e2', from: 'state', to: 'local', arrows: 'to', color: { color: '#1e293b' }, width: 2, label: 'Delegated\nAuthority', font: { size: 10, align: 'middle' } },
    { id: 'e3', from: 'federal', to: 'tribal', arrows: 'to;from', color: { color: '#16a34a' }, width: 3, label: 'Nation-to-Nation\nRelationship', font: { size: 10, align: 'middle', color: '#166534' } },
    { id: 'e4', from: 'tribal', to: 'state', arrows: 'to', dashes: true, color: { color: '#16a34a' }, width: 1.5, label: 'Consultation\nRequirement', font: { size: 9, align: 'middle', color: '#166534' } }
  ]);

  function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
  }
  const enableMouse = !isInIframe();

  const options = {
    layout: { improvedLayout: false },
    physics: { enabled: false },
    interaction: {
      selectConnectedEdges: false,
      dragView: enableMouse,
      zoomView: enableMouse,
      navigationButtons: true,
      hover: true,
      keyboard: { enabled: true, bindToWindow: false }
    },
    nodes: { shape: 'ellipse', borderWidth: 2, shadow: { enabled: true, size: 4 } },
    edges: { smooth: { type: 'curvedCW', roundness: 0.1 }, font: { face: 'Arial' } }
  };

  const container = document.getElementById('vn-network');
  const network = new vis.Network(container, { nodes, edges }, options);

  network.once('afterDrawing', function () {
    network.fit({ animation: false, maxZoomLevel: 1.3 });
  });
  setTimeout(() => { network.fit({ animation: false, maxZoomLevel: 1.3 }); network.redraw(); }, 300);

  const panel = document.getElementById('vn-panel');

  network.on('click', function (params) {
    if (params.nodes.length) {
      panel.innerHTML = '<h4>' + params.nodes[0] + '</h4>' + nodeInfo[params.nodes[0]];
      network.selectNodes([params.nodes[0]]);
    } else if (params.edges.length) {
      panel.innerHTML = '<h4>Relationship</h4>' + edgeInfo[params.edges[0]];
    }
  });

  network.on('hoverNode', function (params) {
    panel.innerHTML = '<h4>' + params.node + '</h4>' + nodeInfo[params.node];
  });
});
