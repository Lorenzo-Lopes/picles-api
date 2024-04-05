import { InjectModel } from "@nestjs/mongoose";
import { Shelter } from "./schemas/shelter.schema";
import { Model } from "mongoose";
import ISShelterRepository from "./interfaces/shelter.repository.interface";

export class ShelterRository  implements ISShelterRepository{
    constructor(
        @InjectModel(Shelter.name)
        private readonly shelterModel: Model<Shelter>
    ){}

    async get(): Promise<Shelter>{
        return await this.shelterModel.findOne()
    }
}