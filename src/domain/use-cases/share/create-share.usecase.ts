import { IShareRepository } from "../../../infrastructure/interfaces/i-share.repository";
import { Share } from "../../entities/share.entity";
import shareModel from "../../../infrastructure/repositories/mongodb/model/share.model";
import { Schema } from "mongoose";
import { ShareDocument } from "../../../infrastructure/types/share.type";

export interface CreateShareRequest {
  title: string;
  investorId: string;
}

export interface CreateShareResponse {
  id: string;
  title: string;
  errors: string[];
}

export class CreateShare {
  constructor(
    private shareRepository: IShareRepository,
  ) { }

  async execute(request: CreateShareRequest): Promise<CreateShareResponse> {
    const share = new Share(request.title, request.investorId);

    if (share.hasValidationErrors())
      return { errors: share.validationErrors } as CreateShareResponse;      

    const shares =  await this.shareRepository.findByTitle(request.title, request.investorId);

    if (shares.length > 0)
      return { errors: ['Title has been used'] } as CreateShareResponse;

    const shareValid = new shareModel({
      title: share.title,
      investorId: share.investorId,
    }) as unknown as ShareDocument;    

    const shareCreated = await this.shareRepository.save(shareValid);

    return {
      id: shareCreated.id,
      title: shareCreated.title,
    } as CreateShareResponse;
  }
}