import { IShareRepository } from "../../../infrastructure/interfaces/i-share.repository";
import { GetSharesRequest, GetSharesResponse } from "../../req-res/share.req-res";

export class ShareUsecase {

  constructor(
    private shareRepository: IShareRepository,
  ) { }
  
  async getShares(request: GetSharesRequest): Promise<GetSharesResponse[]> {
    const shares = await this.shareRepository.find(request.investorId);

    const sharesMap = shares.map(x => { 
      return {
        id: x.id,
        title: x.title
      } 
    });

    return sharesMap as GetSharesResponse[];
  }
}