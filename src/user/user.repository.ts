import { Injectable } from "@nestjs/common";
import IUserRepository from "./interfaces/user.repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }
  async create(data: Partial<User>): Promise<User> {
    console.log(data)
    return await this.userModel.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateById(data: Partial<User>): Promise<void> {
    await this.userModel.updateOne(
      {
        _id: data._id,
      },
      {
        ...data,
        updatedAt: new Date(),
      },
    );
  }
}
