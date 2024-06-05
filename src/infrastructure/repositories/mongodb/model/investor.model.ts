import { Schema, model } from "mongoose"
import bcryptjs from "bcryptjs";
import { InvestorDocument } from "../../../types/investor.type";

const investorSchema = new Schema<InvestorDocument>({
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    createIndexes: { unique: true },
  },
  name: {
    type: String,
    required: [true, 'Username is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
},
{
  timestamps: true,
  versionKey: false
});

investorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
 
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

investorSchema.methods.validatePassword = function (password: string) {
  return bcryptjs.compare(password, this.password);
};

export default model<InvestorDocument>('Investor', investorSchema);
