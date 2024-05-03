import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "./schema/auth.schema";
import IAuthRepository from "./interfaces/auth.repository.interface";

@Injectable()
export default class AuthRepository implements IAuthRepository {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
  ) {}

  async getByEmail(email: string): Promise<Auth> {

    return await this.authModel.findOne({email:email})

  }
}

