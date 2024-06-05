import { IExpectationRepository } from "../../../infrastructure/interfaces/i-expectation.repository";
import { ExpectationDocument } from "../../../infrastructure/types/expectation.type";
import { Expectation } from "../../entities/expectation.entity";
import { CreateExpectationRequest, CreateExpectationResponse, GetExpectationsRequest, GetExpectationsResponse } from "../../req-res/expectation.req-res";

export class ExpectationUsecase {
  constructor(
    private expectationRepository: IExpectationRepository
  ) {}

  async create(request: CreateExpectationRequest): Promise<CreateExpectationResponse> {
    const expectation = new Expectation(request.description, request.shareId, request.investorId);

    if (expectation.hasValidationErrors())
      return { errors: expectation.validationErrors } as CreateExpectationResponse;      

    const expectations =  await this.expectationRepository.findByDescription(request.description, request.shareId);

    if (expectations.length > 0)
      return { errors: ['Title has been used'] } as CreateExpectationResponse;

    const expectationValid = {
      description: request.description,
      shareId: request.shareId,
      investorId: request.investorId,
    } as ExpectationDocument;    

    const expectationCreated = await this.expectationRepository.save(expectationValid);

    return {
      id: expectationCreated.id,
      shareId: expectationCreated.shareId,
      description: expectationCreated.description,
    } as CreateExpectationResponse;
  }

  async getExpectations(request: GetExpectationsRequest): Promise<GetExpectationsResponse[]> {
    const expectations = await this.expectationRepository.find(request.shareId, request.investorId);

    const expectationsMap = expectations.map(x => { 
      return {
        id: x.id,
        description: x.description,
        shareId: x.shareId
      } 
    });

    return expectationsMap as GetExpectationsResponse[];
  }
}