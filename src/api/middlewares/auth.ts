import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { secret } from "../config/secret";
import { ExpressRequestInterface } from "../types/express-request.interface";
import InvestorModel from '../../infrastructure/repositories/mongodb/model/investor.model';

export default async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
  try {    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    const data = await jwt.verify(token, secret) as { id: string; email: string };
    const investor = await InvestorModel.findById(data.id);

    if (!investor) {
      return res.sendStatus(401);
    }

    req.investor = investor;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};