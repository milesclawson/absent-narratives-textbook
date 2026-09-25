// Equity vs. Equality Resource Allocator
// CANVAS_HEIGHT: 500
// Bloom Level: Evaluate — judge which allocation approach best achieves a stated goal.
// Instructional Design Check: Evaluate-level -> students run both rules themselves and compare a
// live-computed numeric gap, rather than reading a static illustration. No animation is used for
// its own sake; platform bars change height only in direct response to the Distribute action.

let canvasWidth = 800;
let drawHeight = 380;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 260;
let defaultTextSize = 16;

let modeToggleButton;
let distributeButton;
let unitsSlider;
let equityMode = false;
let unitsToDistribute = 20;

// Starting resource levels (platform base heights in px, drawn from bottom of drawing area)
const groups = [
  { name: 'Group A', start: 30, current: 30, color: [239, 68, 68] },
  { name: 'Group B', start: 80, current: 80, color: [234, 179, 8] },
  { name: 'Group C', start: 150, current: 150, color: [34, 197, 94] }
];

let lastEqualityGap = null;
let lastEquityGap = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  modeToggleButton = createButton('Mode: Equality');
  modeToggleButton.position(10, drawHeight + 5);
  modeToggleButton.mousePressed(toggleMode);

  distributeButton = createButton('Distribute');
  distributeButton.position(140, drawHeight + 5);
  distributeButton.mousePressed(distribute);

  unitsSlider = createSlider(10, 30, unitsToDistribute, 1);
  unitsSlider.position(sliderLeftMargin, drawHeight + 45);
  unitsSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Three platforms of different starting heights, labeled Group A, B, and C. A toggle switches between Equality and Equity distribution rules, a slider sets total resource units, and a Distribute button applies the rule, updating platform heights and a numeric gap readout.', LABEL);
}

function draw() {
  updateCanvasSize();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  noStroke();
  text('Equity vs. Equality Resource Allocator', canvasWidth / 2, 10);

  const baseY = drawHeight - 30;
  const platformW = 90;
  const spacing = canvasWidth / 4;

  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    const x = spacing * (i + 1) - platformW / 2;
    fill(g.color[0], g.color[1], g.color[2]);
    stroke(30);
    strokeWeight(1.5);
    rect(x, baseY - g.current, platformW, g.current);
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textSize(13);
    text(g.name, x + platformW / 2, baseY + 8);
    text('height: ' + nf(g.current, 1, 0), x + platformW / 2, baseY + 26);
  }

  // baseline
  stroke(120);
  strokeWeight(2);
  line(40, baseY, canvasWidth - 40, baseY);
  noStroke();

  // results readout
  fill(20);
  textAlign(LEFT, TOP);
  textSize(14);
  let y = 45;
  text('Starting gap (tallest − shortest): ' + (150 - 30), 20, y);
  y += 22;
  if (lastEqualityGap !== null) { text('Gap after Equality distribution: ' + nf(lastEqualityGap, 1, 1), 20, y); y += 22; }
  if (lastEquityGap !== null) { text('Gap after Equity distribution: ' + nf(lastEquityGap, 1, 1), 20, y); y += 22; }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  unitsToDistribute = unitsSlider.value();
  text('Total resource units: ' + unitsToDistribute, 10, drawHeight + 55);
}

function toggleMode() {
  equityMode = !equityMode;
  modeToggleButton.html('Mode: ' + (equityMode ? 'Equity' : 'Equality'));
}

function distribute() {
  // reset to starting heights first
  groups.forEach((g) => (g.current = g.start));
  const units = unitsSlider.value();

  if (!equityMode) {
    // Equality: identical share to each group
    const share = units / groups.length;
    groups.forEach((g) => (g.current = g.start + share * 4)); // scale factor for visible bar movement
    const heights = groups.map((g) => g.current);
    lastEqualityGap = Math.max(...heights) - Math.min(...heights);
  } else {
    // Equity: inverse proportion to starting height (lower starting height gets more)
    const totalDeficit = groups.reduce((sum, g) => sum + (200 - g.start), 0);
    groups.forEach((g) => {
      const weight = (200 - g.start) / totalDeficit;
      g.current = g.start + weight * units * 4;
    });
    const heights = groups.map((g) => g.current);
    lastEquityGap = Math.max(...heights) - Math.min(...heights);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  unitsSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
