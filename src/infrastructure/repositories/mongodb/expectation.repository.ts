import { IExpectationRepository } from "../../interfaces/i-expectation.repository";
import { ExpectationDocument } from "../../types/expectation.type";
import ExpectationModel from "./model/expectation.model";

export class ExpectationRepository implements IExpectationRepository {
  async save(expectation: ExpectationDocument): Promise<ExpectationDocument> {
    const newExpectation = new ExpectationModel(expectation);
    const expectationSaved = await newExpectation.save();
    return expectationSaved;
  }

  async findByDescription(description: string, shareId: string): Promise<ExpectationDocument[]> {
    const expectations = await ExpectationModel.find({ description, shareId });
    return expectations;
  }

  async find(shareId: string, investorId: string): Promise<ExpectationDocument[]> {
    const expectations = await ExpectationModel.find({ investorId });
    return expectations;
  }
}