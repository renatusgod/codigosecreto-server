import { CreateExpectationRequest, GetExpectationsRequest } from "../../domain/req-res/expectation.req-res";
import { CreateExpectations } from "../../domain/use-cases/expectation/create-expectations.usecase";
import { ExpectationUsecase } from "../../domain/use-cases/expectation/expectation.usecase";
import { ExpressRequestInterface } from "../types/express-request.interface";
import { BaseController } from "./base.controller";
import { Response } from "express";

export class ExpectationController extends BaseController {

  constructor(
    private expectationUsecase: ExpectationUsecase,
  ) {
    super();
    
  }

  async save(req: ExpressRequestInterface, res: Response) {
    try {      
      if (!req.investor) {
        return res.sendStatus(401);
      }

      const request = {
        description: req.body.description,
        shareId: req.params.shareId,
        investorId: req.investor.id
      } as CreateExpectationRequest;

      const response = await this.expectationUsecase.create(request);
    
      return this.complete(res, response, null);
    } catch (error) {
      return this.complete(res, null, error);
    }
  }

  async getExpectations(req: ExpressRequestInterface, res: Response) {
    try {      
      if (!req.investor) {
        return res.sendStatus(401);
      }

      const request = {
        investorId: req.investor.id
      } as GetExpectationsRequest;

      const response = await this.expectationUsecase.getExpectations(request);
    
      return this.complete(res, response, null);
    } catch (error) {
      return this.complete(res, null, error);
    }
  }
}