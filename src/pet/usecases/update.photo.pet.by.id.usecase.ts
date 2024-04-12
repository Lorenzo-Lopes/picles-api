import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetPhotoByIdUseCaseInput from "./dtos/update.pet.photo.by.id.usecase.input";
import { Inject, Injectable } from "@nestjs/common";
import UpdatePetPhotoByIdUseCaseOutput from "./dtos/update.pet.photo.by.id.usecase.output";
import IPetRepository from "../pet.repository";
import PetTokens from "../pet.tokens";
import { Pet } from "../schemas/pet.schema";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";

@Injectable()
export default class UpdatePetPhotoByIdUseCase implements IUseCase<UpdatePetPhotoByIdUseCaseInput,UpdatePetPhotoByIdUseCaseOutput>{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
  ) {}

  async run(input: UpdatePetPhotoByIdUseCaseInput): Promise<UpdatePetPhotoByIdUseCaseOutput> {
    const pet = await this.getPetById(input.id);
    if (pet === null) {
      throw new PetNotFoundError();
    }
    await this.petRepository.updateById({
      _id:input.id,
      photo:input.photoPath,
    })
  }


  private async getPetById(id: string): Promise<Pet> {
    try {
      return await this.petRepository.getById(id);
    } catch (error) {
      return null;
    }
  }

}
