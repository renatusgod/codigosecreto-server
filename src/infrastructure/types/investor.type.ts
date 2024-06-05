import { BaseType } from "./base.type";
import { Document } from "mongoose";

export interface Investor extends BaseType {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface InvestorDocument extends Document, Investor {
  validatePassword(param1: string): Promise<boolean>;
}
