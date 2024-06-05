import { expect, test, describe } from 'vitest';
import { CreateInvestor } from '../../src/domain/use-cases/investor/create-investor.usecase';
import { InvestorMemoryRepository } from '../../src/infrastructure/repositories/in-memory/investor-memory.repository';

const investorRepository = new InvestorMemoryRepository();
const createInvestor = new CreateInvestor(investorRepository);

describe('create-investor', () => {
  test('must create investor', async () => {
    const request = { 
      name: 'Renato', 
      lastname: 'Miranda', 
      email: 'rena@gmail.com',
      password: 'yv3uyv4',
    }

    const response = await createInvestor.execute(request);
    
    expect(response.errors).toBeUndefined();
  });

  test('must not create with name invalid', async () => {
    const request = { 
      name: '', 
      lastname: 'Miranda', 
      email: 'rena@gmail.com',
      password: 'yv3uyv4',
    }

    const response = await createInvestor.execute(request);

    expect(response.errors[0]).toEqual('Name is required');
  });

  test('must not create with lastname invalid', async () => {
    const request = { 
      name: 'Renato', 
      lastname: '', 
      email: 'rena@gmail.com',
      password: 'yv3uyv4',
    }

    const response = await createInvestor.execute(request);

    expect(response.errors[0]).toEqual('Lastname is required');
  });

  test('must not create with email invalid', async () => {
    const request = { 
      name: 'Renato', 
      lastname: 'Miranda', 
      email: '',
      password: 'yv3uyv4',
    }

    const response = await createInvestor.execute(request);

    expect(response.errors[0]).toEqual('Email is required');
  });

  test('must not create with password invalid', async () => {
    const request = { 
      name: 'Renato', 
      lastname: 'Miranda', 
      email: 'rena@gmail.com',
      password: '',
    }

    const response = await createInvestor.execute(request);

    expect(response.errors[0]).toEqual('Password is required');
  });

  test('must not create with email has been used', async () => {
    const request = { 
      name: 'Renato', 
      lastname: 'Miranda', 
      email: 'rena@gmail.com',
      password: 'yv3uyv4',
    }

    await createInvestor.execute(request);    

    const response = await createInvestor.execute(request);
    
    expect(response.errors[0]).toEqual('Email has been used');
  });
});