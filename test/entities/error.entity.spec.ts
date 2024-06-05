import { expect, test } from 'vitest';
import { ErrorEntity } from '../../src/domain/entities/error.entity';

test('shuld be 1 error on list', () => {
  let errors = new ErrorEntity();

  errors.addValidationError('one error');

  expect(errors.validationErrors.length).toEqual(1);
});

test('shuld clear the error list', () => {
  let errors = new ErrorEntity();

  errors.addValidationError('one error');

  errors.clearValidationErrors();

  expect(errors.validationErrors.length).toEqual(0);
});

test('shuld be valid error list', () => {
  let errors = new ErrorEntity();

  errors.addValidationError('one error');

  expect(errors.hasValidationErrors()).toBeTruthy();
});

test('shuld be invalid error list', () => {
  let errors = new ErrorEntity();
  
  expect(errors.hasValidationErrors()).toBeFalsy();
});