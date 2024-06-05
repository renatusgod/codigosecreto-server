import { Document } from "mongoose";
import { BaseType } from "./base.type";

export interface Share extends BaseType {
  title: string;
  investorId: string;
}

export interface ShareDocument extends Document, Share {}
