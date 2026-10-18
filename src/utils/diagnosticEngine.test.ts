import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  diagnosePreset, 
  diagnoseCustomSteps, 
  PRESET_PROBLEMS,
  getClassMisconceptions
} from './diagnosticEngine.ts';

test('diagnosePreset correctly identifies error root in distributive algebra', () => {
  const result = diagnosePreset('distributive_algebra');
  assert.equal(result.score, 7.5);
  assert.equal(result.errorRootLineNumber, 2);
  assert.equal(result.steps.length, 5);
  
  // Step 1 should be correct
  assert.equal(result.steps[0].isCorrect, true);
  assert.equal(result.steps[0].isErrorRoot, false);

  // Step 2 should be error root
  assert.equal(result.steps[1].isCorrect, false);
  assert.equal(result.steps[1].isErrorRoot, true);
  assert.match(result.steps[1].annotation || '', /GỐC LỖI/i);

  // Step 3 should be consequential error
  assert.equal(result.steps[2].isCorrect, false);
  assert.equal(result.steps[2].isErrorRoot, false);

  // Should provide remedial exercise
  assert.ok(result.remedialExercise);
  assert.equal(result.remedialExercise.correctAnswer, 'x = 2/11');
});

test('diagnosePreset correctly marks perfect solution with score 10 and no error root', () => {
  const result = diagnosePreset('quadratic_perfect');
  assert.equal(result.score, 10);
  assert.equal(result.errorRootLineNumber, undefined);
  assert.equal(result.steps.every(s => s.isCorrect), true);
});

test('diagnosePreset fraction equation identifies right-hand side missing multiplier', () => {
  const result = diagnosePreset('fraction_equation');
  assert.equal(result.score, 7.0);
  assert.equal(result.errorRootLineNumber, 2);
  assert.match(result.misconceptionCategory, /khử mẫu/i);
});

test('diagnoseCustomSteps catches distributive error on custom text lines', () => {
  const text = `
    3(5 - 2y) - y = 1
    15 - 2y - y = 1
    15 - 3y = 1
  `;
  const result = diagnoseCustomSteps(text);
  assert.equal(result.errorRootLineNumber, 2);
  assert.match(result.misconceptionExplanation, /quên nhân 3 với 2y/i);
});

test('getClassMisconceptions returns prioritized misconception data with severity', () => {
  const stats = getClassMisconceptions();
  assert.ok(stats.length >= 3);
  assert.equal(stats[0].severity, 'high');
  assert.ok(stats[0].errorRatePercent > 0);
});
