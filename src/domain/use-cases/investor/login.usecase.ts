
import { IInvestorRepository } from "../../../infrastructure/interfaces/i-investor.repository";
import normalizeInvestor from '../../use-cases/auth/auth.usecase'

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  token: string;
  name: string;
  email: string;
  errors: string[];
}

export class Login {

  constructor(
    private investorRepository: IInvestorRepository,
  ) { }

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const investor = await this.investorRepository.findByEmail(request.email);

    if(!investor)
      return { errors: ['E-mail ou senha incorretos'] } as LoginResponse;

    const isSamePassword = await investor.validatePassword(request.password);

    if (!isSamePassword) {
      return { errors: ['E-mail ou senha incorretos'] } as LoginResponse;
    }

    return normalizeInvestor(investor);
  }
}