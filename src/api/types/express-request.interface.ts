import { Request } from "express";
import { InvestorDocument } from "../../infrastructure/types/investor.type";

 export interface ExpressRequestInterface extends Request {
  investor?: InvestorDocument;
};