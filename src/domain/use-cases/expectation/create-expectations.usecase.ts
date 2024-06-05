import { IExpectationRepository } from "../../../infrastructure/interfaces/i-expectation.repository";
import { ExpectationDocument } from "../../../infrastructure/types/expectation.type";
import { Expectation } from "../../entities/expectation.entity";

export interface CreateExpectationsRequest {
  descriptions: string[];
  shareId: string;
  investorId: string;
}

export interface CreateExpectationsResponse {
  descriptions: string[];
  shareId: string;
  errors: string[];
}

export class CreateExpectations {
  constructor(
    private expectationRepository: IExpectationRepository,
  ) { }

  async execute(request: CreateExpectationsRequest): Promise<CreateExpectationsResponse> {
    const expectationList = request
      .descriptions
      .map(description => new Expectation(description, request.shareId, request.investorId));

    const expectationErrors = expectationList.filter(expectation => expectation.hasValidationErrors());

    if (expectationErrors.length) {
      let errors: string[] = [];
      expectationErrors.forEach(expectation => expectation.validationErrors.forEach(error => errors.push(error)));
      return { errors:  errors } as CreateExpectationsResponse;      
    }

    const expectations = await this.expectationRepository.findByDescription(request.descriptions[0], request.shareId); 

    if (expectations.length > 0)
      return { errors: expectations.map(expectation => expectation.description + ' has been used')} as CreateExpectationsResponse;

    const expectationsValid = expectationList.map(expectation => {
      return {
        description: expectation.description,
        shareId: expectation.shareId,
        investorId: expectation.investorId,
      } as ExpectationDocument
    });

    await this.expectationRepository.save(expectationsValid[0]);

    return { } as CreateExpectationsResponse;
  }
}