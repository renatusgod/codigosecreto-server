import { IExpectationRepository } from "../../interfaces/i-expectation.repository";
import { ExpectationDocument } from "../../types/expectation.type";

export class ExpectationMemoryRepository implements IExpectationRepository {
  find(shareId: string, investorId: string): Promise<ExpectationDocument[]> {
    throw new Error("Method not implemented.");
  }
  expectations: ExpectationDocument[] = [];

  async save(expectation: ExpectationDocument): Promise<ExpectationDocument> {
    this.expectations.push(expectation);
    return expectation;
  }

  async findByDescription(descriptions: string, shareId: string): Promise<ExpectationDocument[]> {    
    return this.expectations.filter(expectation => descriptions.includes(expectation.description) && expectation.shareId == shareId);
  }
}