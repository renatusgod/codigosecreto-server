import { IInvestorRepository } from "../../interfaces/i-investor.repository";
import { InvestorDocument } from "../../types/investor.type";

export class InvestorMemoryRepository implements IInvestorRepository{
  investors: InvestorDocument[] = [];

  async save(investor: InvestorDocument): Promise<void> {
    this.investors.push(investor);
  }

  async findByEmail(email: string): Promise<InvestorDocument[]> {    
    return this.investors.filter(investor => investor.email === email);
  }
}