import { InvestorDocument } from "../../../infrastructure/types/investor.type";
import { LoginResponse } from "../investor/login.usecase";
import jwt from 'jsonwebtoken';
import { secret } from "../../../api/config/secret";

export default (investor: InvestorDocument): LoginResponse => {
  const token = jwt.sign({ id: investor.id, email: investor.email }, secret);
   
  return { 
    email: investor.email,
    name: investor.name,
    id: investor.id,
    token: `Bearer ${token}`,
  } as LoginResponse;
};