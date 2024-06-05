import { IInvestorRepository } from "../../../infrastructure/interfaces/i-investor.repository";
import { InvestorDocument } from "../../../infrastructure/types/investor.type";
import { Investor } from "../../entities/investor.entity";

export interface CreateInvestorRequest {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface CreateInvestorResponse {
  errors: string[];
}

export class CreateInvestor {
  constructor(
    private investorRepository: IInvestorRepository,
  ) { }

  async execute(request: CreateInvestorRequest): Promise<CreateInvestorResponse> {
    const investor = new Investor(
      request.name, 
      request.lastname, 
      request.email,
      request.password);

    if (investor.hasValidationErrors())
      return { errors: investor.validationErrors } as CreateInvestorResponse;      

    const investorExist =  await this.investorRepository.findByEmail(request.email); 
    if (investorExist)
      return { errors: ['Email has been used'] } as CreateInvestorResponse;

    const investorValid = {
      name: investor.Name,
      lastname: investor.LastName,
      email: investor.Email,
      password: investor.Password,
    } as InvestorDocument;

    await this.investorRepository.save(investorValid);

    return { } as CreateInvestorResponse;
  }
}