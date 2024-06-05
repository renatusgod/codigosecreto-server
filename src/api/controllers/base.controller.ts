import { Response } from "express";
import { StatusResponseEnum } from "../enum/status-response.enum";

export class BaseController {
  protected complete(res: Response, response: any, error: any) {
    if (response?.errors?.length)
      return res.status(400).send({ status: StatusResponseEnum.failure, errors: response.errors });

    if (error)
      return res.status(500).send({ status: StatusResponseEnum.error, error: error?.message });
    
    return res.status(200).send({ status: StatusResponseEnum.success, data: response });
  }
}