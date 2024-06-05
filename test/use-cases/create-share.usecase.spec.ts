import { expect, test, describe } from 'vitest';
import { CreateShare } from '../../src/domain/use-cases/share/create-share.usecase';
import { ShareMemoryRepository } from '../../src/infrastructure/repositories/in-memory/share-memory.repository';

const shareRepository = new ShareMemoryRepository();
const createShare = new CreateShare(shareRepository);

describe('create-share', () => {
  test('must create share', async () => {
    const response = await createShare.execute({ title: 'Alimentação', investorId: 'jhg34hg343jb' });
    
    expect(response.title).toBe('Alimentação');
    expect(response.id.length).toBeGreaterThan(0);
  });

  test('must not create with title invalid', async () => {
    const response = await createShare.execute({ title: '', investorId: 'jhg34hg343jb' });

    expect(response.errors[0]).toEqual('Title is required');
  });

  test('must not create with investorId invalid', async () => {
    const response = await createShare.execute({ title: 'Saúde', investorId: '' });

    expect(response.errors[0]).toEqual('InvestorId is required');
  });

  test('must not create with title has been used', async () => {
    await createShare.execute({ title: 'Físico', investorId: 'jhg34hg343jb' });

    const response = await createShare.execute({ title: 'Físico', investorId: 'jhg34hg343jb' });  
    console.log(response);
     
    expect(response.errors[0]).toEqual('Title has been used');
  });
});