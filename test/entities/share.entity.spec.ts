import { expect, test, describe } from 'vitest';
import { Share } from '../../src/domain/entities/share.entity';

describe('create share', () => {
  test('must be able create a share', () => {
    const investorId = 'ksgfyu4gwgf8w74iwesf';

    const share = new Share(
      'Saúde',
      investorId,
    );
  
    expect(share).toBeInstanceOf(Share);
    expect(share.hasValidationErrors()).toBeFalsy();
    expect(share.title).toEqual('Saúde');
    expect(share.investorId).toEqual(investorId);
  });
  
  test('must not create a share with title invalid', () => {
    const investorId = 'ksgfyu4gwgf8w74iwesf';

    const share = new Share(
      '',
      investorId,
    );
  
    expect(share.hasValidationErrors()).toBeTruthy();
    expect(share.validationErrors[0]).toEqual('Title is required');
  });
  
  test('must not create a share with investorId invalid', () => {
    const share = new Share(
      'Saúde',
      '',
    );
  
    expect(share.hasValidationErrors()).toBeTruthy();
    expect(share.validationErrors[0]).toEqual('InvestorId is required');
  });
});

describe('update share', () => {
  test('must update a title', () => {
    const investorId = 'ksgfyu4gwgf8w74iwesf';

    const share = new Share(
      'Saúde',
      investorId,
    );

    share.updateTitle('Espiritual');
  
    expect(share).toBeInstanceOf(Share);
    expect(share.hasValidationErrors()).toBeFalsy();
    expect(share.title).toEqual('Espiritual');
  });

  test('must not update a title', () => {
    const investorId = 'ksgfyu4gwgf8w74iwesf';

    const share = new Share(
      'Saúde',
      investorId,
    );

    share.updateTitle('');
  
    expect(share.hasValidationErrors()).toBeTruthy();
  });
});