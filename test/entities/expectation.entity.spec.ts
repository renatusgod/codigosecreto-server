import { expect, test, describe } from 'vitest';
import { Expectation } from '../../src/domain/entities/expectation.entity';

describe('create expectation', () => {
  test('must be able create an expectation', () => {
    const expectation = new Expectation(
      'Tomar 3L de água',
      'jhg3hjgj3g3j',
      'shdgfjhgjhg34g3j4'
    );
  
    expect(expectation).toBeInstanceOf(Expectation);
    expect(expectation.hasValidationErrors()).toBeFalsy();
    expect(expectation.description).toEqual('Tomar 3L de água');
    expect(expectation.shareId).toEqual('jhg3hjgj3g3j');
    expect(expectation.investorId).toEqual('shdgfjhgjhg34g3j4');
  });
  
  test('must not create an expectation with description invalid', () => {
    const expectation = new Expectation(
      '',
      'jhg3hjgj3g3j',
      'shdgfjhgjhg34g3j4'
    );    
  
    expect(expectation.hasValidationErrors()).toBeTruthy();
    expect(expectation.validationErrors[0]).toEqual('Description is required');
  });
  
  test('must not create an expectation with share invalid', () => {
    const expectation = new Expectation(
      'Tomar 3L de água',
      '',
      'shdgfjhgjhg34g3j4'
    );
  
    expect(expectation.hasValidationErrors()).toBeTruthy();
    expect(expectation.validationErrors[0]).toEqual('ShareId is required');
  });
  
  test('must not create an expectation with investorId invalid', () => {
    const expectation = new Expectation(
      'Tomar 3L de água',
      'jhg3hjgj3g3j',
      ''
    );
  
    expect(expectation.hasValidationErrors()).toBeTruthy();
    expect(expectation.validationErrors[0]).toEqual('InvestorId is required');
  });
});