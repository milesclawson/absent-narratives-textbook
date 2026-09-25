// The Historian's Cross-Checking Process — Mermaid workflow
// CANVAS_HEIGHT: 520
// Bloom Level: Apply — students trace the steps from source to corroborated claim.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  main.innerHTML = `
    <style>
      .msim-wrap { display:flex; height:518px; font-family: Arial, Helvetica, sans-serif; }
      .msim-diagram { flex: 0 0 66.67%; background: aliceblue; overflow: visible; display:flex; align-items:center; justify-content:center; }
      .msim-diagram .mermaid { width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; }
      .msim-diagram .mermaid svg { max-width: 100% !important; max-height: 100% !important; width: auto !important; height: auto !important; }
      .msim-info { flex: 0 0 33.33%; background: white; border-left: 1px solid silver; padding: 10px; box-sizing: border-box; position: relative; }
      .msim-legend { border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 10px; font-size: 12px; background: #fff; margin-bottom: 10px; }
      .msim-legend-title { font-weight: bold; margin-bottom: 6px; }
      .msim-legend-item { display:flex; align-items:center; margin: 3px 0; }
      .msim-legend-dot { width:12px; height:12px; border-radius:3px; margin-right:6px; display:inline-block; }
      .msim-info h3 { font-size: 15px; margin: 0 0 8px 0; color:#1e3a8a; }
      #msim-panel { background:#f8fafc; color:#334155; border:1px solid #e2e8f0; border-radius:6px; padding:10px; font-size:14px; min-height: 300px; }
      .node { cursor: pointer; }
      #msim-tooltip { position:fixed; background:#333; color:#fff; padding:6px 10px; border-radius:6px; font-size:12px; max-width:240px; pointer-events:none; opacity:0; transition:opacity 0.15s; z-index:1000; }
      #msim-tooltip.visible { opacity:1; }
    </style>
    <div class="msim-wrap">
      <div class="msim-diagram"><div class="mermaid" id="msim-graph"></div></div>
      <div class="msim-info">
        <div class="msim-legend">
          <div class="msim-legend-title">Color Key</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#3b82f6"></span>Source-gathering step</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#fbbf24"></span>Decision checkpoint</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#22c55e"></span>Accepted claim</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#ef4444"></span>Contested claim</div>
        </div>
        <h3>Step Details</h3>
        <div id="msim-panel">Click any step in the diagram to see its definition here.</div>
      </div>
    </div>
    <div id="msim-tooltip"></div>
  `;

  const nodeInfo = {
    A: 'Primary source: a firsthand account created by a witness or participant. Secondary source: a later account that interprets primary sources. The historian starts by locating whichever kind of source is available.',
    B: 'Author perspective: the specific vantage point — social, political, geographic, personal — from which a source\'s creator viewed events. Every source was created by someone with a position, not a neutral observer.',
    C: 'Source bias: the tendency of a source to reflect its creator\'s vantage point or interests. Ask: who created this, when, for what audience, what does it assume, and what seems to be missing?',
    D: 'Historical context: the surrounding political, economic, and social circumstances in which a source was created. Example: a 1920s law that looks neutral on paper may have been designed, in its specific context, to accomplish something its text never states.',
    E: 'Source corroboration: checking whether multiple independent sources, ideally with different perspectives, agree on the same basic facts. A claim from a single, uncorroborated source is treated as provisional.',
    F: 'The historian asks whether independent sources agree. If yes, the claim becomes provisional history. If no — or if only one perspective survives — that gap is itself evidence of historical silence.',
    G: 'A provisional historical claim: accepted for now because multiple independent sources agree, but always revisable if new evidence emerges. Historians rarely claim final certainty.',
    H: 'When sources disagree or only one perspective survives, historians flag the claim as contested and note the possibility of an absent narrative — a story that existed but was not preserved.'
  };

  const tooltipPreview = {
    A: 'Where do primary and secondary sources come from?',
    B: 'Whose vantage point produced this source?',
    C: 'What might this source be leaving out?',
    D: 'Does the surrounding context change the reading?',
    E: 'Do other independent sources agree?',
    F: 'Decision point: do sources converge?',
    G: 'A claim historians currently accept.',
    H: 'A claim historians cannot yet confirm.'
  };

  const mermaidCode = `flowchart TD
    A["Locate a Source"]:::blue
    B["Identify Creator and Perspective"]:::blue
    C["Check for Source Bias"]:::blue
    D{"Does Historical Context<br/>Change the Reading?"}:::yellow
    E["Search for Corroborating Sources"]:::blue
    F{"Do Independent<br/>Sources Agree?"}:::yellow
    G(["Provisional Historical Claim"]):::green
    H(["Flag as Contested -<br/>Note Absent Narrative"]):::red

    A --> B --> C --> D --> E --> F
    F -->|Yes| G
    F -->|No| H

    classDef blue fill:#3b82f6,stroke:#1e3a8a,stroke-width:2px,color:#fff,font-size:16px
    classDef yellow fill:#fbbf24,stroke:#92400e,stroke-width:2px,color:#333,font-size:16px
    classDef green fill:#22c55e,stroke:#166534,stroke-width:2px,color:#fff,font-size:16px
    classDef red fill:#ef4444,stroke:#7f1d1d,stroke-width:2px,color:#fff,font-size:16px
    linkStyle default stroke:#999,stroke-width:2px,font-size:14px`;

  document.getElementById('msim-graph').textContent = mermaidCode;

  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', subGraphTitleMargin: { top: 10, bottom: 14 } }
  });

  const tooltip = document.getElementById('msim-tooltip');
  const panel = document.getElementById('msim-panel');

  function idFromNode(node) {
    // mermaid v10 node ids look like "flowchart-A-12"
    const parts = node.id.replace('flowchart-', '').split('-');
    return parts[0];
  }

  function setupInteractivity() {
    const nodes = document.querySelectorAll('#msim-graph .node');
    nodes.forEach((node) => {
      const key = idFromNode(node);
      if (!nodeInfo[key]) return;
      node.addEventListener('mouseenter', (e) => {
        tooltip.textContent = tooltipPreview[key] || '';
        tooltip.classList.add('visible');
      });
      node.addEventListener('mousemove', (e) => {
        const x = Math.min(e.clientX + 15, window.innerWidth - 250);
        const y = Math.min(e.clientY + 15, window.innerHeight - 60);
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      });
      node.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
      node.addEventListener('click', () => {
        panel.textContent = nodeInfo[key];
      });
    });
  }

  function waitForMermaid() {
    const svg = document.querySelector('#msim-graph svg');
    if (svg && document.querySelectorAll('#msim-graph .node').length > 0) {
      setupInteractivity();
    } else {
      setTimeout(waitForMermaid, 100);
    }
  }

  mermaid.run({ querySelector: '#msim-graph' }).then(() => {
    setTimeout(waitForMermaid, 50);
  });
});
