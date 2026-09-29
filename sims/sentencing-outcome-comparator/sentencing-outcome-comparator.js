// Sentencing Outcome Comparator — Chart.js
// CANVAS_HEIGHT: 500
// Bloom Level: Evaluate — assess whether an observed disparity is consistent with sentencing disparity.
//
// Implementation note: this chart uses EXPLICIT fixed pixel canvas dimensions
// (computed once from the container's real measured width) rather than
// Chart.js's built-in `responsive: true` auto-sizing. In testing, the
// responsive/auto-measurement path produced corrupted bar positions and
// near-zero bar heights in this iframe embedding context, while explicit
// fixed dimensions render correctly every time. A manual `window.resize`
// listener rebuilds the chart at the new width so it still adapts to the
// container, just without relying on Chart.js's internal auto-detection.
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  main.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .cj-wrap { font-family: Arial, Helvetica, sans-serif; min-height:498px; background:aliceblue; padding:10px; }
      .cj-title { text-align:center; font-size:15px; font-weight:bold; color:#1e293b; margin-bottom:4px; }
      .cj-controls { text-align:center; margin-bottom:6px; font-size:13px; }
      .cj-chart-box { position:relative; background:#fff; border-radius:6px; padding:8px; text-align:center; }
      .cj-note { font-size:10.5px; color:#666; font-style:italic; text-align:center; margin-top:8px; }
    </style>
    <div class="cj-wrap">
      <div class="cj-title">Sentence Length Distribution for a Matched Offense, by Demographic Group</div>
      <div class="cj-controls">
        Offense category:
        <select id="cj-offense">
          <option value="0">Offense Category 1 (illustrative)</option>
          <option value="1">Offense Category 2 (illustrative)</option>
          <option value="2">Offense Category 3 (illustrative)</option>
        </select>
      </div>
      <div class="cj-chart-box" id="cj-box"></div>
      <div class="cj-note">Illustrative figures consistent with the general pattern documented in U.S. Sentencing Commission demographic reports — not individualized case data. Offense category and severity are held constant across groups within each chart.</div>
    </div>
  `;

  // Each group: [low estimate, typical/median estimate, high estimate] in months,
  // for a single held-constant offense category.
  const offenseData = [
    { labels: ['Group A', 'Group B', 'Group C'], low: [6, 10, 14], mid: [9, 14, 20], high: [12, 18, 26] },
    { labels: ['Group A', 'Group B', 'Group C'], low: [9, 11, 15], mid: [12, 15, 19], high: [15, 19, 24] },
    { labels: ['Group A', 'Group B', 'Group C'], low: [4, 8, 13], mid: [6, 11, 17], high: [9, 15, 22] }
  ];

  const box = document.getElementById('cj-box');
  let chart;
  let currentOffense = 0;

  function buildChart(idx, width) {
    const d = offenseData[idx];
    const height = 300;

    if (chart) { chart.destroy(); }
    box.innerHTML = '';
    const canvasEl = document.createElement('canvas');
    canvasEl.width = width;
    canvasEl.height = height;
    canvasEl.style.width = width + 'px';
    canvasEl.style.height = height + 'px';
    box.appendChild(canvasEl);

    chart = new Chart(canvasEl, {
      type: 'bar',
      data: {
        labels: d.labels,
        datasets: [
          { label: 'Low estimate (months)', data: d.low, backgroundColor: '#93c5fd', borderColor: '#1e3a8a', borderWidth: 1 },
          { label: 'Typical estimate (months)', data: d.mid, backgroundColor: '#3b82f6', borderColor: '#1e3a8a', borderWidth: 1 },
          { label: 'High estimate (months)', data: d.high, backgroundColor: '#1e40af', borderColor: '#1e3a8a', borderWidth: 1 }
        ]
      },
      options: {
        responsive: false,
        animation: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 14, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.parsed.y + ' months';
              }
            }
          }
        },
        scales: {
          y: {
            title: { display: true, text: 'Sentence length (months)' },
            beginAtZero: true,
            suggestedMax: 30
          },
          x: {
            title: { display: true, text: 'Demographic group (matched offense category)' }
          }
        }
      }
    });
  }

  function currentWidth() {
    const w = Math.floor(box.getBoundingClientRect().width) - 16; // minus box padding
    return Math.max(280, w);
  }

  buildChart(currentOffense, currentWidth());

  document.getElementById('cj-offense').addEventListener('change', (e) => {
    currentOffense = parseInt(e.target.value, 10);
    buildChart(currentOffense, currentWidth());
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { buildChart(currentOffense, currentWidth()); }, 150);
  });
});
