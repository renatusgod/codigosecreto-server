import { Schema, Document } from "mongoose";
import { BaseType } from "./base.type";

export interface Expectation extends BaseType {
  description: string;
  // shareId: Schema.Types.ObjectId;
  shareId: string;
  // investorId: Schema.Types.ObjectId;
  investorId: string;
}

export interface ExpectationDocument extends Document, Expectation {}
