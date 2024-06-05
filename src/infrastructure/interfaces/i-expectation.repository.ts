import { ExpectationDocument } from "../types/expectation.type";

export interface IExpectationRepository {
  save(expectation: ExpectationDocument): Promise<ExpectationDocument>;
  // findByDescription(descriptions: string[], shareId: string): Promise<ExpectationDocument[]>;
  findByDescription(description: string, shareId: string): Promise<ExpectationDocument[]>;

  find(shareId: string, investorId: string): Promise<ExpectationDocument[]>;
}