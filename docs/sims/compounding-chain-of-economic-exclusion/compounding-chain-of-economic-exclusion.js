// The Compounding Chain of Economic Exclusion — Mermaid clickable chain
// CANVAS_HEIGHT: 560
// Bloom Level: Evaluate — judge where policy intervention would be most effective.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  main.innerHTML = `
    <style>
      .msim-wrap { display:flex; height:558px; font-family: Arial, Helvetica, sans-serif; }
      .msim-diagram { flex: 0 0 66.67%; background: aliceblue; overflow: visible; display:flex; align-items:center; justify-content:center; }
      .msim-diagram .mermaid { width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; }
      .msim-diagram .mermaid svg { max-width: 100% !important; max-height: 100% !important; width: auto !important; height: auto !important; }
      .msim-info { flex: 0 0 33.33%; background: white; border-left: 1px solid silver; padding: 10px; box-sizing: border-box; }
      .msim-legend { border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 10px; font-size: 12px; background: #fff; margin-bottom: 10px; }
      .msim-legend-title { font-weight: bold; margin-bottom: 6px; }
      .msim-legend-item { display:flex; align-items:center; margin: 3px 0; }
      .msim-legend-dot { width:12px; height:12px; border-radius:3px; margin-right:6px; display:inline-block; }
      .msim-info h3 { font-size: 15px; margin: 0 0 8px 0; color:#1e3a8a; }
      #msim-panel { background:#f8fafc; color:#334155; border:1px solid #e2e8f0; border-radius:6px; padding:10px; font-size:14px; min-height: 340px; }
      .node, .edgeLabel { cursor: pointer; }
      #msim-tooltip { position:fixed; background:#333; color:#fff; padding:6px 10px; border-radius:6px; font-size:12px; max-width:240px; pointer-events:none; opacity:0; transition:opacity 0.15s; z-index:1000; }
      #msim-tooltip.visible { opacity:1; }
    </style>
    <div class="msim-wrap">
      <div class="msim-diagram"><div class="mermaid" id="msim-graph"></div></div>
      <div class="msim-info">
        <div class="msim-legend">
          <div class="msim-legend-title">Color Key</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#ef4444"></span>Originating policy</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#f97316"></span>Mechanism</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#991b1b"></span>Present-day outcome</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#22c55e"></span>Intervention branch</div>
        </div>
        <h3>Chain Link Details</h3>
        <div id="msim-panel">Click any box or dashed intervention arrow to see its definition here.</div>
      </div>
    </div>
    <div id="msim-tooltip"></div>
  `;

  const nodeInfo = {
    R: 'Redlining (1930s): a discriminatory practice, formalized by federal housing agencies beginning in the 1930s, of denying mortgages or insurance to residents of neighborhoods color-coded red on official maps, regardless of an individual applicant\'s creditworthiness.',
    H: 'Housing discrimination: the unfair treatment of individuals seeking to buy, rent, or finance housing. It continued in new forms — steering, discriminatory appraisal — even after redlining was formally outlawed by the Fair Housing Act of 1968.',
    C: 'Reduced access to credit: redlining did not just deny individual mortgage applications — it denied entire neighborhoods, for generations, the access to credit that homeownership in a growing economy depends on.',
    D: 'Community disinvestment: the systematic withdrawal of public and private investment — infrastructure, business lending, school funding — from a neighborhood, often a direct consequence of its redlined status.',
    W: 'Wealth gap (present day): the persistent difference in accumulated assets between demographic groups. It is larger than the income gap because wealth compounds across generations while income resets each year.'
  };

  const edgeInfo = {
    'Fair Housing Enforcement': 'Fair housing enforcement targets ongoing housing discrimination directly — investigating steering and appraisal bias to stop the mechanism from continuing to operate today.',
    'Credit Access Programs': 'Credit access programs (e.g., community development financial institutions, targeted lending programs) aim to restore the access to credit that redlining withheld from specific neighborhoods for generations.',
    'Reparations': 'Reparations are proposed compensation intended to redress the cumulative economic harm — including the present-day wealth gap — caused by historical injustices such as redlining and slavery.'
  };

  const mermaidCode = `flowchart TD
    R["Redlining (1930s)"]:::red
    H["Housing Discrimination"]:::orange
    C["Reduced Access to Credit"]:::orange
    D["Community Disinvestment"]:::orange
    W["Wealth Gap (Present Day)"]:::darkred
    I(["Possible Interventions"]):::green

    R --> H --> C --> D --> W
    I -.->|"Fair Housing Enforcement"| H
    I -.->|"Credit Access Programs"| C
    I -.->|"Reparations"| W

    classDef red fill:#ef4444,stroke:#7f1d1d,stroke-width:2px,color:#fff,font-size:15px
    classDef orange fill:#f97316,stroke:#7c2d12,stroke-width:2px,color:#fff,font-size:15px
    classDef darkred fill:#991b1b,stroke:#450a0a,stroke-width:2px,color:#fff,font-size:15px
    classDef green fill:#22c55e,stroke:#166534,stroke-width:2px,color:#fff,font-size:15px
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
        tooltip.textContent = 'Click for the definition of this link in the chain.';
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

    const edgeLabels = document.querySelectorAll('#msim-graph .edgeLabel');
    edgeLabels.forEach((label) => {
      const text = (label.textContent || '').trim();
      const match = Object.keys(edgeInfo).find((k) => text.includes(k));
      if (!match) return;
      label.addEventListener('mouseenter', () => {
        tooltip.textContent = 'Click for what this intervention targets.';
        tooltip.classList.add('visible');
      });
      label.addEventListener('mousemove', (e) => {
        const x = Math.min(e.clientX + 15, window.innerWidth - 250);
        const y = Math.min(e.clientY + 15, window.innerHeight - 60);
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      });
      label.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
      label.addEventListener('click', () => { panel.textContent = edgeInfo[match]; });
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
