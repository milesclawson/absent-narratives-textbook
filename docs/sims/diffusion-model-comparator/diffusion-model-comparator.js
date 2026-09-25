// Diffusion Model Comparator — vis-network
// CANVAS_HEIGHT: 560
// Bloom Level: Analyze — differentiate between diffusion models applied to the same scenario.
document.addEventListener('DOMContentLoaded', function () {
  const visCss = document.createElement('link');
  visCss.rel = 'stylesheet';
  visCss.href = 'https://unpkg.com/vis-network/styles/vis-network.min.css';
  document.head.appendChild(visCss);

  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .vn-wrap { height:558px; font-family: Arial, Helvetica, sans-serif; background:aliceblue; display:flex; flex-direction:column; }
      .vn-title { text-align:center; font-size:16px; font-weight:bold; color:#1e293b; padding:8px; }
      .vn-scenario { text-align:center; padding-bottom:6px; font-size:13px; }
      .vn-graphs { flex: 0 0 260px; display:flex; }
      .vn-half { flex:1; position:relative; border-right:1px solid #cbd5e1; }
      .vn-half:last-child { border-right:none; }
      .vn-half-label { position:absolute; top:4px; left:50%; transform:translateX(-50%); font-size:13px; font-weight:bold; color:#1e293b; z-index:5; }
      #vn-net1, #vn-net2 { width:100%; height:100%; }
      .vn-info { flex:1; background:#fff; border-top:1px solid #cbd5e1; padding:8px 14px; font-size:12px; overflow:auto; }
      .vn-info h4 { margin:4px 0 4px; font-size:13px; color:#1e293b; }
      .vn-answer { padding:6px 14px; }
      .vn-answer textarea { width:100%; height:44px; font-family:inherit; font-size:12px; padding:6px; box-sizing:border-box; }
      select { font-size:13px; padding:2px 4px; }
    </style>
    <div class="vn-wrap">
      <div class="vn-title">Diffusion Model Comparator</div>
      <div class="vn-scenario">
        Scenario:
        <select id="vn-scenario-select">
          <option value="0">Trade-driven spread</option>
          <option value="1">Migration-driven spread</option>
          <option value="2">Conquest-driven spread</option>
        </select>
      </div>
      <div class="vn-graphs">
        <div class="vn-half"><div class="vn-half-label">Expansion Diffusion</div><div id="vn-net1"></div></div>
        <div class="vn-half"><div class="vn-half-label">Relocation Diffusion</div><div id="vn-net2"></div></div>
      </div>
      <div class="vn-info" id="vn-info"><h4>Click either edge for a worked example</h4>Select a scenario above, then click the "Expansion Diffusion" or "Relocation Diffusion" arrow to see whether that model fits.</div>
      <div class="vn-answer">
        <label style="font-size:12px;">Which model fits this scenario best, and why? (not auto-graded — for class discussion)</label>
        <textarea placeholder="Type your answer here..."></textarea>
      </div>
    </div>
  `;

  const scenarios = [
    {
      origin: 'Silk Road\nTraders', dest: 'Trading\nPartners', practice: 'papermaking technology',
      expansionFit: 'Fits well: papermaking spread along Silk Road trade routes while remaining fully practiced in its origin region — traders carried the idea outward without leaving home.',
      relocationFit: 'Partial fit at best: this spread mainly through trade contact and traveling artisans, not large permanent population relocation — expansion diffusion is the better primary model here.'
    },
    {
      origin: 'Home\nRegion', dest: 'New Settlement\nRegion', practice: 'a community\'s religious practice',
      expansionFit: 'Partial fit at best: some religious ideas do spread by contact alone, but this scenario centers on people physically moving and settling.',
      relocationFit: 'Fits well: when a community migrates and settles permanently in a new region, they carry their religious practice with them — often with reduced practice remaining in the region they left.'
    },
    {
      origin: 'Colonizing\nPower', dest: 'Colonized\nTerritory', practice: 'an administrative language',
      expansionFit: 'Partial fit: the colonizing power\'s home region keeps full use of its language while the colonized territory adopts it under pressure — resembling expansion diffusion in structure.',
      relocationFit: 'Also partial: colonial administrators and settlers often relocated permanently, carrying the language with them — many real colonial cases mix both models rather than fitting one cleanly.'
    }
  ];

  function buildNodes(s) {
    return new vis.DataSet([
      { id: 'o', label: s.origin, x: -100, y: 0, color: { background: '#16a34a', border: '#14532d' }, font: { color: '#fff', size: 13 }, shape: 'ellipse' },
      { id: 'd', label: s.dest, x: 100, y: 0, color: { background: '#3b82f6', border: '#1e3a8a' }, font: { color: '#fff', size: 13 }, shape: 'ellipse' }
    ]);
  }

  const options = {
    layout: { improvedLayout: false },
    physics: { enabled: false },
    interaction: { selectConnectedEdges: false, dragView: false, zoomView: false, navigationButtons: false, hover: true },
    nodes: { borderWidth: 2, shadow: { enabled: true, size: 3 } },
    edges: { font: { size: 11, face: 'Arial' } }
  };

  let net1, net2;
  const infoDiv = document.getElementById('vn-info');

  function render(scenarioIdx) {
    const s = scenarios[scenarioIdx];
    const edges1 = new vis.DataSet([{ id: 'exp', from: 'o', to: 'd', arrows: 'to', color: { color: '#166534' }, width: 3, label: s.practice, font: { size: 10 } }]);
    const edges2 = new vis.DataSet([{ id: 'rel', from: 'o', to: 'd', arrows: 'to', dashes: true, color: { color: '#1e3a8a' }, width: 3, label: s.practice, font: { size: 10 } }]);

    if (net1) net1.destroy();
    if (net2) net2.destroy();

    net1 = new vis.Network(document.getElementById('vn-net1'), { nodes: buildNodes(s), edges: edges1 }, options);
    net2 = new vis.Network(document.getElementById('vn-net2'), { nodes: buildNodes(s), edges: edges2 }, options);

    net1.once('afterDrawing', () => net1.fit({ animation: false, maxZoomLevel: 1.4 }));
    net2.once('afterDrawing', () => net2.fit({ animation: false, maxZoomLevel: 1.4 }));
    setTimeout(() => { net1.fit({ animation: false, maxZoomLevel: 1.4 }); net2.fit({ animation: false, maxZoomLevel: 1.4 }); }, 250);

    net1.on('click', (p) => {
      if (p.edges.length) infoDiv.innerHTML = '<h4>Expansion Diffusion — Does it fit?</h4>' + s.expansionFit;
    });
    net2.on('click', (p) => {
      if (p.edges.length) infoDiv.innerHTML = '<h4>Relocation Diffusion — Does it fit?</h4>' + s.relocationFit;
    });
  }

  render(0);
  document.getElementById('vn-scenario-select').addEventListener('change', (e) => {
    render(parseInt(e.target.value, 10));
    infoDiv.innerHTML = '<h4>Click either edge for a worked example</h4>Select a scenario above, then click the "Expansion Diffusion" or "Relocation Diffusion" arrow to see whether that model fits.';
  });
});
