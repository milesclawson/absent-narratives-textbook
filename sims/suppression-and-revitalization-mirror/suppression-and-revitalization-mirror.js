// Suppression and Revitalization as Mirror Processes — Mermaid
// CANVAS_HEIGHT: 560
// Bloom Level: Understand — explain the relationship between suppression and revitalization.
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
      .node { cursor: pointer; }
      #msim-tooltip { position:fixed; background:#333; color:#fff; padding:6px 10px; border-radius:6px; font-size:12px; max-width:240px; pointer-events:none; opacity:0; transition:opacity 0.15s; z-index:1000; }
      #msim-tooltip.visible { opacity:1; }
    </style>
    <div class="msim-wrap">
      <div class="msim-diagram"><div class="mermaid" id="msim-graph"></div></div>
      <div class="msim-info">
        <div class="msim-legend">
          <div class="msim-legend-title">Color Key</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#ef4444"></span>Suppression track</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#22c55e"></span>Revitalization track</div>
          <div class="msim-legend-item"><span class="msim-legend-dot" style="background:#0891b2"></span>Outcome</div>
        </div>
        <h3>Step Details</h3>
        <div id="msim-panel">Click any box to see its definition here.</div>
      </div>
    </div>
    <div id="msim-tooltip"></div>
  `;

  const nodeInfo = {
    S1: 'Policy decision: a deliberate, dated government or institutional choice to prohibit or discourage a group\'s language — for example, a boarding-school-era language ban. This is linguistic suppression enacted as explicit policy, not neglect.',
    S2: 'Reduced intergenerational transmission: when children are punished for speaking a language, fewer of them pass it to their own children later, breaking the chain by which a language is normally passed down.',
    S3: 'Language endangerment: the resulting state in which a language has few remaining fluent speakers, most of them elderly, because intergenerational transmission was broken by the earlier suppression policy.',
    V1: 'Community organizing: a language community, often younger generations reconnecting with elders, builds deliberate collective effort to reverse endangerment — this is grassroots organizing (Chapter 11) applied to language.',
    V2: 'Elder-youth documentation partnerships: fluent elders and younger community members work together to record vocabulary, grammar, and oral tradition before it is lost, creating teaching materials from that documentation.',
    V3: 'Renewed intergenerational transmission: as documentation and teaching efforts mature, more children again learn the language from family and community members, partially reversing the earlier break.',
    P: 'Partial recovery: language revitalization rarely restores a language to its pre-suppression state, but a documented case can show a real, measurable increase in speakers and everyday use following sustained community effort.'
  };

  const mermaidCode = `flowchart TD
    subgraph SUP["Suppression"]
        direction LR
        S1["Policy Decision<br/>(e.g., boarding school<br/>language ban)"]:::red
        S2["Reduced Intergenerational<br/>Transmission"]:::red
        S3["Language<br/>Endangerment"]:::red
        S1 --> S2 --> S3
    end
    subgraph REV["Revitalization"]
        direction LR
        V1["Community Organizing<br/>(grassroots organizing)"]:::green
        V2["Elder-Youth Documentation<br/>Partnerships"]:::green
        V3["Renewed Intergenerational<br/>Transmission"]:::green
        V1 --> V2 --> V3
    end
    P(["Partial Recovery"]):::teal

    S3 -.->|"Motivates Response"| V1
    V3 -.->|"Closes the Loop"| P

    classDef red fill:#ef4444,stroke:#7f1d1d,stroke-width:2px,color:#fff,font-size:14px
    classDef green fill:#22c55e,stroke:#166534,stroke-width:2px,color:#fff,font-size:14px
    classDef teal fill:#0891b2,stroke:#164e63,stroke-width:2px,color:#fff,font-size:14px
    linkStyle default stroke:#666,stroke-width:2px,font-size:12px`;

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
        tooltip.textContent = 'Click for the definition of this step.';
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
