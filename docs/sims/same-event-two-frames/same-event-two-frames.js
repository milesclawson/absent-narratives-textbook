// Same Event, Two Frames
// CANVAS_HEIGHT: 500
// Bloom Level: Analyze — differentiate factual content from framing choices.
// Instructional Design Check: Analyze-level -> static side-by-side comparison with click-to-reveal
// connotation notes; no animation, since the point is careful reading, not motion.

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 15;

let highlightButton, factCheckButton;
let highlightOn = false;
let factCheckOn = false;
let activeChip = null;

const panelA = {
  headline: 'Protesters Clash With Police Downtown',
  lead: 'A crowd of demonstrators confronted officers near the courthouse Tuesday afternoon, disrupting traffic for several hours before dispersing peacefully.'
};
const panelB = {
  headline: 'Mob Disrupts Downtown, Officers Respond',
  lead: 'A crowd of operatives confronted officers near the courthouse Tuesday afternoon, disrupting traffic for several hours before dispersing peacefully.'
};

const chipPairs = [
  { a: 'Protesters', b: 'Mob',
    note: '"Protesters" implies a legitimate group exercising a right to assemble. "Mob" implies disorganized, threatening behavior — same people, different implied legitimacy.' },
  { a: 'Clash With', b: 'Disrupts / Officers Respond',
    note: '"Clash With" implies a two-sided confrontation. "Disrupts, Officers Respond" implies one-sided disorder met by order — same event, different implied cause.' },
  { a: 'demonstrators', b: 'operatives',
    note: '"Demonstrators" is a neutral term for people exercising free assembly. "Operatives" implies coordinated, covert action — same people, a very different implied intent.' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  highlightButton = createButton('Highlight Word Choice Differences');
  highlightButton.position(10, drawHeight + 10);
  highlightButton.mousePressed(toggleHighlight);

  factCheckButton = createButton('Show Fact-Check');
  factCheckButton.position(230, drawHeight + 10);
  factCheckButton.mousePressed(toggleFactCheck);

  describe('Two news panels describing the same fictional event with different word choices. A toggle highlights the differing words; clicking a highlighted word pair explains the connotation difference. A second toggle confirms both versions report the same underlying facts.', LABEL);
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

  const gap = 20;
  const panelW = (canvasWidth - gap * 3) / 2;
  const panelH = 200;
  const panelY = 20;

  drawPanel(gap, panelY, panelW, panelH, 'Version A', panelA, 0);
  drawPanel(gap * 2 + panelW, panelY, panelW, panelH, 'Version B', panelB, 1);

  // chips row
  const chipY = panelY + panelH + 20;
  fill(20);
  textAlign(LEFT, TOP);
  textSize(14);
  noStroke();
  text('Differing word choices (click when highlighted):', gap, chipY);
  drawChips(gap, chipY + 22, panelW, panelA, 'a');
  drawChips(gap * 2 + panelW, chipY + 22, panelW, panelB, 'b');

  // info / fact-check area
  const infoY = chipY + 70;
  fill(255, 255, 255, 235);
  stroke(200);
  rect(gap, infoY, canvasWidth - gap * 2, drawHeight - infoY - 10, 6);
  noStroke();
  fill(30);
  textSize(13);
  if (activeChip !== null && highlightOn) {
    text(chipPairs[activeChip].note, gap + 10, infoY + 10, canvasWidth - gap * 2 - 20);
  } else if (factCheckOn) {
    fill(22, 130, 60);
    text('Fact-check: both versions report the same underlying facts — a crowd gathered near the courthouse Tuesday afternoon, traffic was disrupted for several hours, and the crowd dispersed peacefully. No fact differs between the two versions, only word choice and framing.', gap + 10, infoY + 10, canvasWidth - gap * 2 - 20);
  } else {
    fill(90);
    text('Toggle "Highlight Word Choice Differences" above, then click a highlighted chip to see the connotation difference explained here.', gap + 10, infoY + 10, canvasWidth - gap * 2 - 20);
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Highlight: ' + (highlightOn ? 'ON' : 'off') + '   Fact-check: ' + (factCheckOn ? 'CONFIRMED' : 'off'), 10, drawHeight + 55);
}

function drawPanel(x, y, w, h, label, data, side) {
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, h, 6);
  noStroke();
  fill(60);
  textAlign(LEFT, TOP);
  textSize(11);
  text(label, x + 10, y + 6);
  fill(20);
  textSize(16);
  textStyle(BOLD);
  text(data.headline, x + 10, y + 24, w - 20);
  textStyle(NORMAL);
  fill(50);
  textSize(13);
  text(data.lead, x + 10, y + 70, w - 20);
}

function drawChips(x, y, w, data, side) {
  let cx = x;
  chipPairs.forEach((pair, i) => {
    const label = side === 'a' ? pair.a : pair.b;
    const tw = textWidth(label) + 16;
    if (cx + tw > x + w) return; // avoid overflow on very narrow screens
    const isActive = highlightOn;
    const isSelected = activeChip === i && highlightOn;
    fill(isActive ? (isSelected ? color(250, 204, 21) : color(191, 219, 254)) : color(230));
    stroke(isActive ? color(30, 64, 175) : color(180));
    strokeWeight(1);
    rect(cx, y, tw, 26, 5);
    noStroke();
    fill(isActive ? 20 : 130);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(label, cx + tw / 2, y + 13);
    pair['_x' + side] = cx;
    pair['_w' + side] = tw;
    pair['_y' + side] = y;
    cx += tw + 10;
  });
}

function mousePressed() {
  if (!highlightOn) return;
  chipPairs.forEach((pair, i) => {
    ['a', 'b'].forEach((side) => {
      const px = pair['_x' + side], pw = pair['_w' + side], py = pair['_y' + side];
      if (px === undefined) return;
      if (mouseX > px && mouseX < px + pw && mouseY > py && mouseY < py + 26) {
        activeChip = i;
      }
    });
  });
}

function toggleHighlight() {
  highlightOn = !highlightOn;
  highlightButton.html(highlightOn ? 'Hide Word Choice Differences' : 'Highlight Word Choice Differences');
  if (!highlightOn) activeChip = null;
}

function toggleFactCheck() {
  factCheckOn = !factCheckOn;
  factCheckButton.html(factCheckOn ? 'Hide Fact-Check' : 'Show Fact-Check');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
