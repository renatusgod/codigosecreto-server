import { GetSharesRequest } from "../../domain/req-res/share.req-res";
import { CreateShare, CreateShareRequest } from "../../domain/use-cases/share/create-share.usecase";
import { ShareUsecase } from "../../domain/use-cases/share/share.usecase";
import { ExpressRequestInterface } from "../types/express-request.interface";
import { BaseController } from "./base.controller";
import { Response } from "express";

export class ShareController extends BaseController {

  constructor(
    private createShare: CreateShare,
    private shareUsecase: ShareUsecase) {
    super();
    
  }

  async save(req: ExpressRequestInterface, res: Response) {
    try {      
      if (!req.investor) {
        return res.sendStatus(401);
      }

      const createShare = {
        title: req.body.title,
        investorId: req.investor.id
      } as CreateShareRequest;

      const response = await this.createShare.execute(createShare);
    
      return this.complete(res, response, null);
    } catch (error) {
      return this.complete(res, null, error);
    }
  }

  async getShares(req: ExpressRequestInterface, res: Response) {
    try {      
      if (!req.investor) {
        return res.sendStatus(401);
      }
      
      const request = {
        investorId: req.investor.id
      } as GetSharesRequest;

      const response = await this.shareUsecase.getShares(request);
    
      return this.complete(res, response, null);
    } catch (error) {
      return this.complete(res, null, error);
    }
  }
}