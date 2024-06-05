import { InvestorDocument } from "../types/investor.type";

export interface IInvestorRepository {
  save(investor: InvestorDocument): Promise<void>;
  findByEmail(email: string): Promise<InvestorDocument>;
}