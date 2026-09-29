// From Stereotype to Discrimination — Mermaid clickable causal chain
// CANVAS_HEIGHT: 480
// Bloom Level: Analyze — differentiate belief, attitude, and action.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  main.innerHTML = `
    <style>
      .msim-wrap { display:flex; height:478px; font-family: Arial, Helvetica, sans-serif; }
      .msim-diagram { flex: 0 0 66.67%; background: aliceblue; overflow: visible; display:flex; align-items:center; justify-content:center; }
      .msim-diagram .mermaid { width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; }
      .msim-diagram .mermaid svg { max-width: 100% !important; max-height: 100% !important; width: auto !important; height: auto !important; }
      .msim-info { flex: 0 0 33.33%; background: white; border-left: 1px solid silver; padding: 10px; box-sizing: border-box; }
      .msim-legend { border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 10px; font-size: 12px; background: #fff; margin-bottom: 10px; }
      .msim-legend-title { font-weight: bold; margin-bottom: 6px; }
      .msim-legend-item { display:flex; align-items:center; margin: 3px 0; }
      .msim-legend-dot { width:12px; height:12px; border-radius:3px; margin-right:6px; display:inline-block; }
      .msim-info h3 { font-size: 15px; margin: 0 0 8px 0; color:#1e3a8a; }
      #msim-panel { background:#f8fafc; color:#334155; border:1px solid #e2e8f0; border-radius:6px; padding:10px; font-size:14px; min-height: 260px; }
      .node, .edgeLabel { cursor: pointer; }
      #msim-tooltip { position:fixed; background:#333; color:#fff; padding:6px 10px; border-radius:6px; font-size:12px; max-width:240px; pointer-events:none; opacity:0; transition:opacity 0.15s; z-index:1000; }
      #msim-tooltip.visible { opacity:1; }
    </style>
    <div class="msim-wrap">
      <div class="msim-diagram"><div class="mermaid" id="msim-graph"></div></div>
      <div class="msim-info">
        <div class="msim-legend">
          <div class="msim-legend-title">Color Key</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#d1d5db"></span>Belief stage</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#fbbf24"></span>Bias (belief + institution)</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#ef4444"></span>Discrimination (action)</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#22c55e"></span>Where law can act</div>
        </div>
        <h3>Chain Link Details</h3>
        <div id="msim-panel">Click any box in the chain to see its definition here.</div>
      </div>
    </div>
    <div id="msim-tooltip"></div>
  `;

  const nodeInfo = {
    A: 'Stereotype: an oversimplified, widely shared belief about a group, applied to every member regardless of their actual traits. Example: "that group is naturally good at X."',
    B: 'Prejudice: a preformed judgment, usually unfavorable, based on group membership rather than anything the individual has done — an unfavorable attitude formed before any interaction.',
    C: 'Bias: a tendency to favor or disfavor a person, group, or idea. Bias can be conscious or unconscious, and can influence judgment even without the holder intending harm.',
    D: 'Discrimination: unfair treatment of a person or group based on a protected characteristic, resulting in a real difference in outcome — for example, denial of a loan, job, or housing.',
    E: 'Anti-discrimination law targets actions and outcomes, not private beliefs. This is why systemic oppression can outlast the individual prejudices that first produced it — the law reaches link D, not links A-C.'
  };

  const tooltipPreview = {
    A: 'A shared cultural idea about a group.',
    B: 'An individual\'s attitude before interaction.',
    C: 'A tendency, conscious or unconscious.',
    D: 'An action with a real-world outcome.',
    E: 'Where policy can actually intervene.'
  };

  const mermaidCode = `flowchart LR
    A["Stereotype"]:::gray
    B["Prejudice"]:::gray
    C["Bias"]:::yellow
    D["Discrimination"]:::red
    E["Where Law<br/>Can Intervene"]:::green

    A --> B --> C --> D
    D -.->|"policy reaches here"| E

    classDef gray fill:#d1d5db,stroke:#4b5563,stroke-width:2px,color:#111,font-size:16px
    classDef yellow fill:#fbbf24,stroke:#92400e,stroke-width:2px,color:#333,font-size:16px
    classDef red fill:#ef4444,stroke:#7f1d1d,stroke-width:2px,color:#fff,font-size:16px
    classDef green fill:#22c55e,stroke:#166534,stroke-width:2px,color:#fff,font-size:16px
    linkStyle default stroke:#999,stroke-width:2px,font-size:13px`;

  document.getElementById('msim-graph').textContent = mermaidCode;

  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', subGraphTitleMargin: { top: 10, bottom: 14 } }
  });

  const tooltip = document.getElementById('msim-tooltip');
  const panel = document.getElementById('msim-panel');

  function idFromNode(node) {
    return node.id.replace('flowchart-', '').split('-')[0];
  }

  function setupInteractivity() {
    const nodes = document.querySelectorAll('#msim-graph .node');
    nodes.forEach((node) => {
      const key = idFromNode(node);
      if (!nodeInfo[key]) return;
      node.addEventListener('mouseenter', () => {
        tooltip.textContent = tooltipPreview[key] || '';
        tooltip.classList.add('visible');
      });
      node.addEventListener('mousemove', (e) => {
        const x = Math.min(e.clientX + 15, window.innerWidth - 250);
        const y = Math.min(e.clientY + 15, window.innerHeight - 60);
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      });
      node.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
      node.addEventListener('click', () => { panel.textContent = nodeInfo[key]; });
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
