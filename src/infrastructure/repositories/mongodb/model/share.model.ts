import { Schema, model } from "mongoose";
import { ShareDocument } from "../../../types/share.type";

const shareSchema = new Schema<ShareDocument>({
  title: {
    type: String,
    require: true,
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

export default model<ShareDocument>('Share', shareSchema);