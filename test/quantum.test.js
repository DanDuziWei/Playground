import assert from 'node:assert/strict';
import test from 'node:test';
import {
  applyControlledNot,
  applySingleQubitGate,
  createRegister,
  measure,
  probabilities,
  reducedBlochVector,
  rotationGate,
  singleQubitGates
} from '../src/quantum.js';

const almostEqual = (actual, expected, tolerance = 1e-10) => {
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} should be close to ${expected}`);
};

test('Hadamard gate creates an even superposition on q0', () => {
  const register = applySingleQubitGate(createRegister(2), singleQubitGates.H, 0, 'H');
  const distribution = probabilities(register);

  almostEqual(distribution[0].probability, 0.5);
  almostEqual(distribution[1].probability, 0.5);
  almostEqual(distribution[2].probability, 0);
  almostEqual(distribution[3].probability, 0);
});

test('H followed by CNOT creates a Bell state', () => {
  let register = applySingleQubitGate(createRegister(2), singleQubitGates.H, 0, 'H');
  register = applyControlledNot(register, 0, 1);
  const distribution = probabilities(register);

  almostEqual(distribution[0].probability, 0.5);
  almostEqual(distribution[1].probability, 0);
  almostEqual(distribution[2].probability, 0);
  almostEqual(distribution[3].probability, 0.5);
});

test('deterministic measurement collapses state to selected outcome', () => {
  const register = applySingleQubitGate(createRegister(2), singleQubitGates.H, 0, 'H');
  const result = measure(register, 0.75);

  assert.equal(result.outcome, '01');
  assert.deepEqual(probabilities(result.register).map((entry) => entry.probability), [0, 1, 0, 0]);
});

test('RY(pi) rotates |0> to |1> on the Bloch z axis', () => {
  const register = applySingleQubitGate(createRegister(1), rotationGate('Y', Math.PI), 0, 'RY');
  const vector = reducedBlochVector(register, 0);

  almostEqual(vector.z, -1);
});
