import { IShareRepository } from "../../interfaces/i-share.repository";
import { ShareDocument } from "../../types/share.type";

export class ShareMemoryRepository implements IShareRepository{
  find(investorId: string): Promise<ShareDocument[]> {
    throw new Error("Method not implemented.");
  }
  shares: ShareDocument[] = [];

  async save(share: ShareDocument): Promise<ShareDocument> {    
    this.shares.push(share);
    return share;
  }

  async findByTitle(title: string, investorId: string): Promise<ShareDocument[]> {      
    
    console.log(this.shares);
    
    return this
      .shares
      .filter(share => share.title === title && share.investorId as unknown as string === investorId);
  }
}