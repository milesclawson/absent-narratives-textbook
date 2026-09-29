// Packing and Cracking District Simulator
// CANVAS_HEIGHT: 560
// Bloom Level: Apply — use packing/cracking techniques to produce a target outcome.
// Instructional Design Check: Apply-level -> the student paints district boundaries themselves
// (click a district number, then click grid cells) and watches the seat count update live —
// direct manipulation, not a pre-computed demonstration.

let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 15;

const GRID = 10;
let cellColors = []; // 'blue' or 'orange', GRID x GRID
let districtOf = []; // 0..4 or -1 if unassigned, GRID x GRID
let activeDistrict = 0;
let showReference = false;

let districtButtons = [];
let resetButton, referenceButton;

let gridLeft, gridTop, cellSize;
const districtColors = [
  [99, 102, 241], [16, 185, 129], [245, 158, 11], [236, 72, 153], [20, 184, 166]
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  randomSeed(1234);
  buildGrid();

  for (let d = 0; d < 5; d++) {
    const b = createButton('District ' + (d + 1));
    b.position(10 + d * 78, drawHeight + 5);
    b.mousePressed(((idx) => () => { activeDistrict = idx; })(d));
    districtButtons.push(b);
  }

  resetButton = createButton('Reset Districts');
  resetButton.position(10, drawHeight + 40);
  resetButton.mousePressed(resetDistricts);

  referenceButton = createButton('Show Reference Partition');
  referenceButton.position(140, drawHeight + 40);
  referenceButton.mousePressed(toggleReference);

  describe('A 10 by 10 grid of blue and orange voter squares, 60 percent blue and 40 percent orange. Click a district number button, then click grid squares to paint them into that district. A results panel shows which color currently wins each of the 5 districts.', LABEL);
}

function buildGrid() {
  cellColors = [];
  districtOf = [];
  const total = GRID * GRID;
  const blueCount = Math.round(total * 0.6);
  const flat = [];
  for (let i = 0; i < total; i++) flat.push(i < blueCount ? 'blue' : 'orange');
  // shuffle deterministically with the seeded random
  for (let i = flat.length - 1; i > 0; i--) {
    const j = Math.floor(random(i + 1));
    const tmp = flat[i]; flat[i] = flat[j]; flat[j] = tmp;
  }
  let k = 0;
  for (let r = 0; r < GRID; r++) {
    cellColors.push([]);
    districtOf.push([]);
    for (let c = 0; c < GRID; c++) {
      cellColors[r].push(flat[k++]);
      districtOf[r].push(-1);
    }
  }
}

function updateLayout() {
  cellSize = min((canvasWidth * 0.56) / GRID, (drawHeight - 40) / GRID);
  gridLeft = 20;
  gridTop = 40;
}

function draw() {
  updateCanvasSize();
  updateLayout();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  fill('black');
  textAlign(LEFT, TOP);
  textSize(18);
  noStroke();
  text('Grid: 60 blue / 40 orange voters (fixed)', gridLeft, 12);

  const refPartition = referencePartition();

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const x = gridLeft + c * cellSize;
      const y = gridTop + r * cellSize;
      const col = cellColors[r][c] === 'blue' ? color(59, 130, 246) : color(249, 115, 22);
      fill(col);
      stroke(255);
      strokeWeight(1);
      rect(x, y, cellSize, cellSize);

      const d = showReference ? refPartition[r][c] : districtOf[r][c];
      if (d >= 0) {
        noFill();
        stroke(districtColors[d][0], districtColors[d][1], districtColors[d][2]);
        strokeWeight(3);
        rect(x + 1.5, y + 1.5, cellSize - 3, cellSize - 3);
      }
    }
  }

  // results panel
  const panelX = gridLeft + GRID * cellSize + 30;
  const panelW = canvasWidth - panelX - 15;
  noStroke();
  fill('black');
  textSize(16);
  text(showReference ? 'Reference Partition Results' : 'Your District Results', panelX, 12);

  const activeMap = showReference ? refPartition : districtOf;
  const tally = tallyDistricts(activeMap);
  textSize(13);
  let y = 42;
  let blueSeats = 0, orangeSeats = 0, unassignedFull = 0;
  for (let d = 0; d < 5; d++) {
    const t = tally[d];
    let label, col;
    if (t.total === 0) { label = 'District ' + (d + 1) + ': empty'; col = color(120); }
    else {
      const winner = t.blue > t.orange ? 'Blue' : (t.orange > t.blue ? 'Orange' : 'Tied');
      if (winner === 'Blue') blueSeats++; else if (winner === 'Orange') orangeSeats++;
      label = 'District ' + (d + 1) + ': ' + t.blue + ' blue, ' + t.orange + ' orange -> ' + winner + (t.total < 20 ? ' (partial, ' + t.total + '/20)' : '');
      col = winner === 'Blue' ? color(30, 80, 180) : (winner === 'Orange' ? color(180, 90, 20) : color(90));
    }
    fill(col);
    text(label, panelX, y, panelW);
    y += 20;
  }

  y += 8;
  fill(20);
  textSize(14);
  text('Current seats: Blue ' + blueSeats + ', Orange ' + orangeSeats, panelX, y); y += 20;
  text('Proportional target (60/40 vote share): Blue 3, Orange 2', panelX, y); y += 20;
  const gap = Math.abs(blueSeats - 3) + Math.abs(orangeSeats - 2);
  fill(gap === 0 ? color(22, 163, 74) : color(220, 38, 38));
  text(gap === 0 ? 'Matches the proportional target!' : 'Gap from proportional target: ' + gap + ' seat(s)', panelX, y);

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Active district to paint: District ' + (activeDistrict + 1), 10, drawHeight + 78);
}

function referencePartition() {
  // Fixed row-band reference partition: 2 rows per district
  const ref = [];
  for (let r = 0; r < GRID; r++) {
    ref.push([]);
    for (let c = 0; c < GRID; c++) {
      ref[r].push(Math.floor(r / 2));
    }
  }
  return ref;
}

function tallyDistricts(map) {
  const tally = [];
  for (let d = 0; d < 5; d++) tally.push({ blue: 0, orange: 0, total: 0 });
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const d = map[r][c];
      if (d >= 0) {
        tally[d].total++;
        if (cellColors[r][c] === 'blue') tally[d].blue++; else tally[d].orange++;
      }
    }
  }
  return tally;
}

function mousePressed() {
  if (showReference) return; // painting disabled while viewing reference
  if (mouseX < gridLeft || mouseY < gridTop) return;
  const c = Math.floor((mouseX - gridLeft) / cellSize);
  const r = Math.floor((mouseY - gridTop) / cellSize);
  if (r >= 0 && r < GRID && c >= 0 && c < GRID) {
    districtOf[r][c] = activeDistrict;
  }
}

function mouseDragged() {
  mousePressed();
}

function resetDistricts() {
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) districtOf[r][c] = -1;
  }
}

function toggleReference() {
  showReference = !showReference;
  referenceButton.html(showReference ? 'Hide Reference Partition' : 'Show Reference Partition');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
