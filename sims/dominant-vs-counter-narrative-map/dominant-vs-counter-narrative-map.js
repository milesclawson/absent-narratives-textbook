// Dominant Narrative vs. Counter-Narrative Concept Map
// CANVAS_HEIGHT: 460
// Bloom Level: Analyze — examine relationships between four related concepts.
// Instructional Design Check: Analyze level -> network/relationship explorer with click-to-reveal
// definitions and hover-to-reveal relationship labels. No continuous animation; a single short
// reveal animation plays once when the student clicks the center node, then the diagram is static
// and fully explorable — matching "network explorer" pattern for Analyze-level objectives.

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let resetButton;
let linesRevealed = false;
let revealProgress = 0; // 0..1 animates outward lines once
let selectedNode = null;

// node positions are recalculated relative to canvasWidth in updateLayout()
let nodes = {};
const nodeDefs = {
  center: { label: 'A Historical Event', color: [120, 120, 120], example: 'Example: the westward expansion of the United States in the 19th century.' },
  dominant: { label: 'Dominant Narrative', color: [59, 130, 246], size: 140,
    def: 'The version of events repeated so often it feels like simply "what happened." Not necessarily false, but always partial.',
    example: 'Example: "Pioneers settled an open frontier" is the dominant narrative of westward expansion.' },
  counter: { label: 'Counter-Narrative', color: [249, 115, 22], size: 100,
    def: 'An account that challenges or complicates the dominant narrative by centering perspectives it minimized or omitted.',
    example: 'Example: accounts centering the Indigenous nations displaced by westward expansion.' },
  silence: { label: 'Historical Silence', color: [30, 30, 30], size: 110,
    def: 'The absence, in the historical record, of documentation for a group or event — not because nothing happened, but because no one with power to preserve a record chose to.',
    example: 'Example: few 19th-century U.S. government records center Indigenous perspectives on removal.' },
  marginalization: { label: 'Marginalization', color: [239, 68, 68], size: 110,
    def: 'The process by which a group\'s experiences are pushed to the edges of a society\'s attention or historical record.',
    example: 'Example: displaced nations had little power to have their own accounts collected or published.' }
};

const edgeLabels = [
  { from: 'marginalization', to: 'silence', label: 'Marginalized groups had less power to create and preserve records' },
  { from: 'marginalization', to: 'counter', label: 'Counter-narratives work to recover what marginalization left out' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetButton = createButton('Reset Diagram');
  resetButton.position(10, drawHeight + 15);
  resetButton.mousePressed(resetDiagram);

  updateLayout();
  describe('A concept map showing a central "Historical Event" node connected to Dominant Narrative, Counter-Narrative, Historical Silence, and Marginalization. Click the center to reveal connections, click any node for its definition.', LABEL);
}

function updateLayout() {
  const cx = canvasWidth * 0.38;
  const cy = drawHeight * 0.5;
  const r = min(canvasWidth * 0.30, drawHeight * 0.38);
  nodes.center = { x: cx, y: cy };
  nodes.dominant = { x: cx, y: cy - r };
  nodes.counter = { x: cx + r * 0.95, y: cy - r * 0.15 };
  nodes.marginalization = { x: cx + r * 0.6, y: cy + r * 0.85 };
  nodes.silence = { x: cx - r * 0.6, y: cy + r * 0.85 };
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
  text('Click the center to connect the concepts; click any node to learn more', canvasWidth * 0.19, 10);

  // panel area
  const panelX = canvasWidth * 0.62;
  const panelW = canvasWidth - panelX - margin;
  fill(255, 255, 255, 235);
  stroke(200);
  rect(panelX, 40, panelW, drawHeight - 60, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Concept Details', panelX + 12, 52);
  textSize(14);
  fill(60);
  if (selectedNode && nodeDefs[selectedNode].def) {
    const d = nodeDefs[selectedNode];
    text(d.label, panelX + 12, 82);
    text(d.def, panelX + 12, 106, panelW - 24);
    text(d.example, panelX + 12, 106 + textHeightOf(d.def, panelW - 24) + 14, panelW - 24);
  } else {
    text('Click a node in the diagram to see its definition and an example here.', panelX + 12, 82, panelW - 24);
  }

  // draw connecting lines (revealed after clicking center)
  if (linesRevealed) {
    revealProgress = min(1, revealProgress + 0.06);
  }
  if (revealProgress > 0) {
    const order = ['dominant', 'counter', 'marginalization', 'silence'];
    order.forEach((key, i) => {
      const t = constrain(revealProgress * order.length - i, 0, 1);
      if (t <= 0) return;
      const a = nodes.center;
      const b = nodes[key];
      const ex = lerp(a.x, b.x, t);
      const ey = lerp(a.y, b.y, t);
      stroke(150);
      strokeWeight(2);
      if (key === 'silence') drawingContext.setLineDash([6, 6]); else drawingContext.setLineDash([]);
      line(a.x, a.y, ex, ey);
      drawingContext.setLineDash([]);
    });

    if (revealProgress >= 1) {
      // marginalization -> silence and marginalization -> counter labeled arrows
      drawArrowLabel(nodes.marginalization, nodes.silence, 'produces');
      drawArrowLabel(nodes.marginalization, nodes.counter, 'motivates');
    }
  }

  // draw nodes on top
  drawNode('center', nodeDefs.center.color, 90);
  drawNode('dominant', nodeDefs.dominant.color, nodeDefs.dominant.size);
  drawNode('counter', nodeDefs.counter.color, nodeDefs.counter.size);
  drawNode('silence', nodeDefs.silence.color, nodeDefs.silence.size, true);
  drawNode('marginalization', nodeDefs.marginalization.color, nodeDefs.marginalization.size);

  // hover tooltip for edge labels
  checkEdgeHover();

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Click "Reset Diagram" to replay the connection animation.', 130, drawHeight + 30);
}

function drawNode(key, color, size, dotted) {
  const n = nodes[key];
  const d = nodeDefs[key];
  push();
  if (dotted) {
    drawingContext.setLineDash([5, 5]);
    stroke(0);
    strokeWeight(2);
    fill(color[0], color[1], color[2]);
  } else {
    stroke(30);
    strokeWeight(1.5);
    fill(color[0], color[1], color[2]);
  }
  ellipse(n.x, n.y, size, size * 0.62);
  drawingContext.setLineDash([]);
  pop();

  noStroke();
  fill(key === 'silence' || key === 'marginalization' || key === 'dominant' ? 255 : 30);
  textAlign(CENTER, CENTER);
  textSize(13);
  text(d.label, n.x, n.y, size - 10);
}

function drawArrowLabel(a, b, label) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len, ny = dx / len;
  stroke(220, 38, 38);
  strokeWeight(2);
  drawingContext.setLineDash([]);
  line(a.x, a.y, b.x, b.y);
  // arrowhead
  const ah = 8;
  const ang = atan2(dy, dx);
  push();
  translate(b.x, b.y);
  rotate(ang);
  fill(220, 38, 38);
  noStroke();
  triangle(0, 0, -ah, ah * 0.5, -ah, -ah * 0.5);
  pop();

  noStroke();
  fill(120, 20, 20);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(label, mx + nx * 14, my + ny * 14);
}

function checkEdgeHover() {
  if (revealProgress < 1) return;
  edgeLabels.forEach((edge) => {
    const a = nodes[edge.from];
    const b = nodes[edge.to];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const d = dist(mouseX, mouseY, mx, my);
    if (d < 40 && mouseY < drawHeight) {
      fill(0, 0, 0, 220);
      noStroke();
      const tw = textWidth(edge.label) + 16;
      rect(mouseX + 12, mouseY - 10, min(tw, 260), 40, 6);
      fill(255);
      textAlign(LEFT, TOP);
      textSize(12);
      text(edge.label, mouseX + 18, mouseY - 4, 250);
    }
  });
}

function textHeightOf(txt, w) {
  textSize(14);
  return (textWidth(txt) / w + 1) * 34;
}

function mousePressed() {
  if (mouseY >= drawHeight) return;
  Object.keys(nodes).forEach((key) => {
    const n = nodes[key];
    const d = dist(mouseX, mouseY, n.x, n.y);
    const sizeGuess = key === 'center' ? 90 : (nodeDefs[key].size || 100);
    if (d < sizeGuess / 2) {
      if (key === 'center') {
        linesRevealed = true;
      } else {
        selectedNode = key;
      }
    }
  });
}

function resetDiagram() {
  linesRevealed = false;
  revealProgress = 0;
  selectedNode = null;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayout();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
