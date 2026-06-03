import {
  applyControlledNot,
  applySingleQubitGate,
  createRegister,
  formatComplex,
  measure,
  probabilities,
  reducedBlochVector,
  rotationGate,
  singleQubitGates
} from './quantum.js';

const state = {
  register: createRegister(2),
  selectedQubit: 0,
  theta: Math.PI / 2,
  lastMeasurement: '尚未测量'
};

const elements = {
  amplitudes: document.querySelector('#amplitudes'),
  bars: document.querySelector('#probability-bars'),
  bloch: document.querySelector('#bloch-canvas'),
  history: document.querySelector('#history'),
  measurement: document.querySelector('#measurement'),
  qasm: document.querySelector('#qasm'),
  qubitSelect: document.querySelector('#target-qubit'),
  thetaInput: document.querySelector('#theta'),
  thetaValue: document.querySelector('#theta-value')
};

function applyGate(label) {
  state.register = applySingleQubitGate(
    state.register,
    singleQubitGates[label],
    state.selectedQubit,
    label
  );
  render();
}

function applyRotation(axis) {
  state.register = applySingleQubitGate(
    state.register,
    rotationGate(axis, state.theta),
    state.selectedQubit,
    `R${axis}(${state.theta.toFixed(2)})`
  );
  render();
}

function createBellState() {
  state.register = createRegister(2);
  state.register = applySingleQubitGate(state.register, singleQubitGates.H, 0, 'H');
  state.register = applyControlledNot(state.register, 0, 1);
  state.lastMeasurement = '已创建 Bell 态 Φ⁺';
  render();
}

function reset() {
  state.register = createRegister(2);
  state.lastMeasurement = '寄存器已重置为 |00⟩';
  render();
}

function performMeasurement() {
  const result = measure(state.register);
  state.register = result.register;
  state.lastMeasurement = `测量结果：|${result.outcome}⟩`;
  render();
}

function updateQasm() {
  const instructions = state.register.history.map((item) => {
    if (item.startsWith('CNOT')) return 'cx q[0], q[1];';
    if (item.startsWith('Measure')) return 'measure q -> c;';
    const [gate, qubit] = item.split(' ');
    const target = qubit?.replace('q', '') ?? '0';
    return `${gate.toLowerCase()} q[${target}];`;
  });

  elements.qasm.textContent = [
    'OPENQASM 3.0;',
    'qubit[2] q;',
    'bit[2] c;',
    ...instructions
  ].join('\n');
}

function renderAmplitudes() {
  elements.amplitudes.innerHTML = probabilities(state.register).map(({ label, amplitude, probability }) => `
    <article class="amplitude-card">
      <span class="ket">|${label}⟩</span>
      <strong>${formatComplex(amplitude)}</strong>
      <small>${(probability * 100).toFixed(1)}% 概率</small>
    </article>
  `).join('');
}

function renderBars() {
  elements.bars.innerHTML = probabilities(state.register).map(({ label, probability }) => `
    <div class="bar-row">
      <span>|${label}⟩</span>
      <div class="bar-shell" aria-label="|${label}⟩ probability">
        <div class="bar-fill" style="width: ${(probability * 100).toFixed(2)}%"></div>
      </div>
      <strong>${(probability * 100).toFixed(1)}%</strong>
    </div>
  `).join('');
}

function renderBlochSphere() {
  const canvas = elements.bloch;
  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.34;
  const vector = reducedBlochVector(state.register, state.selectedQubit);

  context.clearRect(0, 0, width, height);
  context.lineWidth = 2;
  context.strokeStyle = 'rgba(174, 214, 255, 0.35)';
  context.fillStyle = 'rgba(53, 124, 255, 0.08)';
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.beginPath();
  context.ellipse(centerX, centerY, radius, radius * 0.28, 0, 0, Math.PI * 2);
  context.stroke();

  drawAxis(context, centerX - radius - 16, centerY, centerX + radius + 16, centerY, 'X');
  drawAxis(context, centerX, centerY + radius + 16, centerX, centerY - radius - 16, 'Z');

  const projectedX = centerX + radius * (vector.x + vector.y * 0.45);
  const projectedY = centerY - radius * (vector.z - vector.y * 0.25);

  context.strokeStyle = '#7cf7d4';
  context.fillStyle = '#7cf7d4';
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(projectedX, projectedY);
  context.stroke();
  context.beginPath();
  context.arc(projectedX, projectedY, 6, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#f8fbff';
  context.font = '15px Inter, system-ui, sans-serif';
  context.fillText(`q${state.selectedQubit}  Bloch 向量`, 18, 28);
  context.fillText(`x=${vector.x.toFixed(2)} y=${vector.y.toFixed(2)} z=${vector.z.toFixed(2)}`, 18, height - 42);
  context.fillText(`纯度=${vector.purity.toFixed(2)}`, 18, height - 18);
}

function drawAxis(context, fromX, fromY, toX, toY, label) {
  context.strokeStyle = 'rgba(248, 251, 255, 0.35)';
  context.fillStyle = 'rgba(248, 251, 255, 0.7)';
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.stroke();
  context.fillText(label, toX + 6, toY + 4);
}

function renderHistory() {
  if (state.register.history.length === 0) {
    elements.history.innerHTML = '<li>等待添加量子门……</li>';
    return;
  }

  elements.history.innerHTML = state.register.history
    .map((item, index) => `<li><span>${index + 1}</span>${item}</li>`)
    .join('');
}

function render() {
  elements.measurement.textContent = state.lastMeasurement;
  elements.thetaValue.textContent = `${Number(elements.thetaInput.value).toFixed(2)}π`;
  renderAmplitudes();
  renderBars();
  renderBlochSphere();
  renderHistory();
  updateQasm();
}

document.querySelectorAll('[data-gate]').forEach((button) => {
  button.addEventListener('click', () => applyGate(button.dataset.gate));
});

document.querySelectorAll('[data-rotation]').forEach((button) => {
  button.addEventListener('click', () => applyRotation(button.dataset.rotation));
});

document.querySelector('#bell').addEventListener('click', createBellState);
document.querySelector('#measure').addEventListener('click', performMeasurement);
document.querySelector('#reset').addEventListener('click', reset);

elements.qubitSelect.addEventListener('change', (event) => {
  state.selectedQubit = Number(event.target.value);
  render();
});

elements.thetaInput.addEventListener('input', (event) => {
  state.theta = Number(event.target.value) * Math.PI;
  render();
});

render();
