import { IShareRepository } from "../../interfaces/i-share.repository";
import { ShareDocument } from "../../types/share.type";
import ShareModel from "./model/share.model";

export class ShareRepository implements IShareRepository {
  async save(share: ShareDocument): Promise<ShareDocument> {
    const newShare = new ShareModel(share);
    const shareSaved = await newShare.save();
    return shareSaved;
  }

  async findByTitle(title: string, investorId: string): Promise<ShareDocument[]> {
    const shares = await ShareModel.find({ title, investorId });
    return shares;
  }

  async find(investorId: string): Promise<ShareDocument[]> {
    const shares = await ShareModel.find({ investorId: investorId });
    return shares;
  }
}