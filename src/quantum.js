export const SQRT1_2 = 1 / Math.sqrt(2);
const EPSILON = 1e-12;

export function complex(re = 0, im = 0) {
  return { re, im };
}

export function add(a, b) {
  return complex(a.re + b.re, a.im + b.im);
}

export function multiply(a, b) {
  return complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
}

export function scale(a, scalar) {
  return complex(a.re * scalar, a.im * scalar);
}

export function conjugate(a) {
  return complex(a.re, -a.im);
}

export function magnitudeSquared(a) {
  return a.re * a.re + a.im * a.im;
}

export function phaseToComplex(theta) {
  return complex(Math.cos(theta), Math.sin(theta));
}

export const singleQubitGates = {
  I: [complex(1), complex(0), complex(0), complex(1)],
  H: [complex(SQRT1_2), complex(SQRT1_2), complex(SQRT1_2), complex(-SQRT1_2)],
  X: [complex(0), complex(1), complex(1), complex(0)],
  Y: [complex(0), complex(0, -1), complex(0, 1), complex(0)],
  Z: [complex(1), complex(0), complex(0), complex(-1)],
  S: [complex(1), complex(0), complex(0), complex(0, 1)],
  T: [complex(1), complex(0), complex(0), phaseToComplex(Math.PI / 4)]
};

export function rotationGate(axis, theta) {
  const c = Math.cos(theta / 2);
  const s = Math.sin(theta / 2);

  if (axis === 'X') {
    return [complex(c), complex(0, -s), complex(0, -s), complex(c)];
  }

  if (axis === 'Y') {
    return [complex(c), complex(-s), complex(s), complex(c)];
  }

  if (axis === 'Z') {
    return [phaseToComplex(-theta / 2), complex(0), complex(0), phaseToComplex(theta / 2)];
  }

  throw new Error(`Unsupported rotation axis: ${axis}`);
}

export function createRegister(qubitCount = 2) {
  if (!Number.isInteger(qubitCount) || qubitCount < 1 || qubitCount > 4) {
    throw new Error('qubitCount must be an integer from 1 to 4');
  }

  const state = Array.from({ length: 2 ** qubitCount }, () => complex(0));
  state[0] = complex(1);
  return { qubitCount, state, history: [] };
}

export function cloneRegister(register) {
  return {
    qubitCount: register.qubitCount,
    state: register.state.map((amp) => complex(amp.re, amp.im)),
    history: [...register.history]
  };
}

export function normalize(register) {
  const total = register.state.reduce((sum, amplitude) => sum + magnitudeSquared(amplitude), 0);
  if (total < EPSILON) {
    throw new Error('Cannot normalize a zero state');
  }

  const factor = 1 / Math.sqrt(total);
  return {
    ...register,
    state: register.state.map((amplitude) => scale(amplitude, factor))
  };
}

export function applySingleQubitGate(register, gate, targetQubit, label = 'gate') {
  if (targetQubit < 0 || targetQubit >= register.qubitCount) {
    throw new Error('targetQubit is out of range');
  }

  const next = register.state.map(() => complex(0));
  const mask = 1 << targetQubit;

  for (let basis = 0; basis < register.state.length; basis += 1) {
    if ((basis & mask) !== 0) continue;

    const zeroIndex = basis;
    const oneIndex = basis | mask;
    const zero = register.state[zeroIndex];
    const one = register.state[oneIndex];

    next[zeroIndex] = add(multiply(gate[0], zero), multiply(gate[1], one));
    next[oneIndex] = add(multiply(gate[2], zero), multiply(gate[3], one));
  }

  return normalize({
    ...register,
    state: next,
    history: [...register.history, `${label} q${targetQubit}`]
  });
}

export function applyControlledNot(register, controlQubit, targetQubit) {
  if (controlQubit === targetQubit) {
    throw new Error('controlQubit and targetQubit must be different');
  }

  const next = register.state.map((amp) => complex(amp.re, amp.im));
  const controlMask = 1 << controlQubit;
  const targetMask = 1 << targetQubit;

  for (let basis = 0; basis < register.state.length; basis += 1) {
    if ((basis & controlMask) === 0 || (basis & targetMask) !== 0) continue;

    const flipped = basis | targetMask;
    [next[basis], next[flipped]] = [next[flipped], next[basis]];
  }

  return normalize({
    ...register,
    state: next,
    history: [...register.history, `CNOT q${controlQubit}->q${targetQubit}`]
  });
}

export function probabilities(register) {
  return register.state.map((amplitude, basis) => ({
    basis,
    label: basis.toString(2).padStart(register.qubitCount, '0'),
    probability: magnitudeSquared(amplitude),
    amplitude
  }));
}

export function measure(register, randomValue = Math.random()) {
  let cumulative = 0;
  const distribution = probabilities(register);
  const outcome = distribution.find((entry) => {
    cumulative += entry.probability;
    return randomValue <= cumulative + EPSILON;
  }) ?? distribution.at(-1);

  const collapsed = register.state.map(() => complex(0));
  collapsed[outcome.basis] = complex(1);

  return {
    outcome: outcome.label,
    register: {
      ...register,
      state: collapsed,
      history: [...register.history, `Measure -> |${outcome.label}⟩`]
    }
  };
}

export function reducedBlochVector(register, targetQubit = 0) {
  const mask = 1 << targetQubit;
  let rho00 = 0;
  let rho11 = 0;
  let rho01 = complex(0);

  for (let basis = 0; basis < register.state.length; basis += 1) {
    if ((basis & mask) !== 0) continue;

    const zero = register.state[basis];
    const one = register.state[basis | mask];
    rho00 += magnitudeSquared(zero);
    rho11 += magnitudeSquared(one);
    rho01 = add(rho01, multiply(zero, conjugate(one)));
  }

  return {
    x: 2 * rho01.re,
    y: -2 * rho01.im,
    z: rho00 - rho11,
    purity: rho00 * rho00 + rho11 * rho11 + 2 * magnitudeSquared(rho01)
  };
}

export function formatComplex({ re, im }, precision = 3) {
  const clean = (value) => Math.abs(value) < EPSILON ? 0 : value;
  const real = clean(re).toFixed(precision);
  const imaginary = Math.abs(clean(im)).toFixed(precision);
  const sign = clean(im) >= 0 ? '+' : '-';
  return `${real} ${sign} ${imaginary}i`;
}
