import { IInvestorRepository } from "../../interfaces/i-investor.repository";
import { InvestorDocument } from "../../types/investor.type";
import InvestorModel from "./model/investor.model";

export class InvestorRepository implements IInvestorRepository {
  async save(investor: InvestorDocument): Promise<void> {
    const newInvestor = new InvestorModel(investor);
    await newInvestor.save();
  }

  async findByEmail(email: string): Promise<InvestorDocument> {
    const investor = await InvestorModel.findOne({ email: email }).select('+password');
    
    return investor as InvestorDocument;
  }
}