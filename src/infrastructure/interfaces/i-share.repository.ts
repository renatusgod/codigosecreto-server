import { ShareDocument } from "../types/share.type";

export interface IShareRepository {
  save(share: ShareDocument): Promise<ShareDocument>;
  
  findByTitle(title: string, investorId: string): Promise<ShareDocument[]>;

  find(investorId: string): Promise<ShareDocument[]>;
}