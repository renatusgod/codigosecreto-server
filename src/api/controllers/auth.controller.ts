import { CreateInvestor, CreateInvestorRequest } from "../../domain/use-cases/investor/create-investor.usecase";
import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Login, LoginRequest } from "../../domain/use-cases/investor/login.usecase";
import normalizeInvestor from '../../domain/use-cases/auth/auth.usecase'
import { ExpressRequestInterface } from "../types/express-request.interface";

export class AuthController extends BaseController {
  constructor(
    private createInvestor: CreateInvestor,
    private loginInvestor: Login) {
    super();
  }

  async register(req: Request, res: Response) {
    try {
      const investor = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      } as CreateInvestorRequest;
  
      const response = await this.createInvestor.execute(investor);
  
      return this.complete(res, response, null);
    } catch (error) {
      return this.complete(res, null, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const investor = {
        email: req.body.email,
        password: req.body.password,
      } as LoginRequest;
  
      const response = await this.loginInvestor.execute(investor);
  
      return this.complete(res, response, null);
    } catch (error) {
      return this.complete(res, null, error);
    }
  }

  async investor(req: ExpressRequestInterface, res: Response) {
    try {      
      if (!req.investor) {
        return res.sendStatus(401);
      }
    
      res.send(normalizeInvestor(req.investor));
    } catch (error) {
      return this.complete(res, null, error);
    }
  }

}