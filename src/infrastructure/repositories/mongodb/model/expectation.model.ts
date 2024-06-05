import { Schema, model } from "mongoose";
import { ShareDocument } from "../../../types/share.type";
import { ExpectationDocument } from "../../../types/expectation.type";

const shareSchema = new Schema<ExpectationDocument>({
  description: {
    type: String,
    require: true,
  },
  shareId: {
    type: String,
    required: true,
  },
  investorId: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
  versionKey: false
});

export default model<ExpectationDocument>('Expectation', shareSchema);