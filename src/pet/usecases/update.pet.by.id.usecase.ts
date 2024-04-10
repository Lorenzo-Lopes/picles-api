import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetByIdUsecaseInput from "./dtos/update.pet.by.id.usecase.input";
import UpdatePetByIdUsecaseOutput from "./dtos/update.pet.by.id.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import IPetRepository from "../pet.repository";
import PetTokens from "../pet.tokens";
import { Pet } from "../schemas/pet.schema";
import PetNotFoundError from "src/domain/erros/pet.not.found.error";

@Injectable()
export default class UpdatePetByIdUsecase implements IUseCase<UpdatePetByIdUsecaseInput, UpdatePetByIdUsecaseOutput>{
    
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
    ){}
    async run(input: UpdatePetByIdUsecaseInput): Promise<UpdatePetByIdUsecaseOutput> {

        let pet = await this.getPetById(input.id)

        if(!pet){
            throw new PetNotFoundError()
        }
        await this.petRepository.updateById({
            ...input,
            _id:input.id

        });
        pet = await this.getPetById(input.id);
        return new UpdatePetByIdUsecaseOutput({
            id: pet._id,
            name:pet.name,
            type:pet.type,
            size:pet.size,
            gender:pet.gender,
            bio: pet.bio,
            photo:null,
            createdAt:pet.createdAt,
            updatedAt:pet.updatedAt,
        })
    }
    private async getPetById(id:string):Promise<Pet>
    {
        try{
            return await this.petRepository.getById(id)
        }catch(error){
            return null
        }
    }
}