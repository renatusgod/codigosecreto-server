import { expect, test, describe } from 'vitest';
import { Investor } from '../../src/domain/entities/investor.entity';

describe('create investor', () => {
  test('must be able create an investor', () => {
    const investor = new Investor(
      'Renato',
      'Miranda',
      'rena@gmail.com',
      '1234',
    );
  
    expect(investor).toBeInstanceOf(Investor);
    expect(investor.hasValidationErrors()).toBeFalsy();
    expect(investor.Email).toEqual('rena@gmail.com');
    expect(investor.Fullname).toEqual('Renato Miranda');
  });
  
  test('must not create an investor with name invalid', () => {
    const investor = new Investor(
      '',
      'Miranda',
      'rena@gmail.com',
      '1234',
    );
  
    expect(investor.hasValidationErrors()).toBeTruthy();
    expect(investor.validationErrors[0]).toEqual('Name is required');
  });
  
  test('must not create an investor with lastname invalid', () => {
    const investor = new Investor(
      'Renato',
      '',
      'rena@gmail.com',
      '1234',
    );
  
    expect(investor.hasValidationErrors()).toBeTruthy();
    expect(investor.validationErrors[0]).toEqual('Lastname is required');
  });
  
  test('must not create an investor with email invalid', () => {
    const investor = new Investor(
      'Renato',
      'Miranda',
      '',
      '1234',
    );
  
    expect(investor.hasValidationErrors()).toBeTruthy();
    expect(investor.validationErrors[0]).toEqual('Email is required');
  });
  
  test('must not create an investor with invalid formater email', () => {
    const investor = new Investor(
      'Renato',
      'Miranda',
      'renagmail.com',
      '1234',
    );
  
    expect(investor.hasValidationErrors()).toBeTruthy();
    expect(investor.validationErrors[0]).toEqual('Invalid email format');
  });

  test('must not create an investor with password invalid', () => {
    const investor = new Investor(
      'Renato',
      'Miranda',
      'rena@gmail.com',
      '',
    );
  
    expect(investor.hasValidationErrors()).toBeTruthy();
    expect(investor.validationErrors[0]).toEqual('Password is required');
  });
});

describe('update investor', () => {
  test('must update a name', () => {
    const investor = new Investor(
      'Renato',
      'Miranda',
      'rena@gmail.com',
      '1234',
    );

    investor.updateName('Aruã');
  
    expect(investor).toBeInstanceOf(Investor);
    expect(investor.hasValidationErrors()).toBeFalsy();
    expect(investor.Fullname).toEqual('Aruã Miranda');
  });

  test('must not update a name', () => {
    const investor = new Investor(
      'Renato',
      'Miranda',
      'rena@gmail.com',
      '1234',
    );

    investor.updateName('');
  
    expect(investor.hasValidationErrors()).toBeTruthy();
  });

  test('must update a lastname', () => {
    const investor = new Investor(
      'Renato',
      'Miranda',
      'rena@gmail.com',
      '1234',
    );

    investor.updateLastname('Moreira');
  
    expect(investor).toBeInstanceOf(Investor);
    expect(investor.hasValidationErrors()).toBeFalsy();
    expect(investor.Fullname).toEqual('Renato Moreira');
  });

  test('must not update a lastname', () => {
    const investor = new Investor(
      'Renato',
      'Miranda',
      'rena@gmail.com',
      '1234',
    );

    investor.updateLastname('');
  
    expect(investor.hasValidationErrors()).toBeTruthy();
  });
});