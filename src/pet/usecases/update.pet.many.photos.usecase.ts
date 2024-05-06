import { Inject, Injectable } from '@nestjs/common';
import AppTokens from 'src/app.tokens';
import PetNotFoundError from 'src/domain/errors/pet.not.found.error';
import { IUseCase } from 'src/domain/iusecase.interface';
import IFileService from 'src/interfaces/file.service.interface';
import IPetRepository from '../pet.repository';
import PetTokens from '../pet.tokens';
import { Pet } from '../schemas/pet.schema';
import UpdatePetManyPhotosByIdUseCaseInput from './dtos/update.pet.many.photos.usecase.input';
import UpdatePetManyPhotosByIdUseCaseOutput from './dtos/update.pet.many.photos.usecase.output';


@Injectable()
export default class UpdatePetManyPhotosByIdUseCase
  implements
    IUseCase<UpdatePetManyPhotosByIdUseCaseInput, UpdatePetManyPhotosByIdUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,

    @Inject(AppTokens.fileService)
    private readonly fileService: IFileService,
  ) {}

  async run(
    input: UpdatePetManyPhotosByIdUseCaseInput,
  ): Promise<UpdatePetManyPhotosByIdUseCaseOutput> {
    console.log(input,'chegou aqui')
    const pet = await this.getPetById(input.id);
    if (pet === null) {
      throw new PetNotFoundError();
    }
    await this.petRepository.updateById({
      _id: input.id,
      photos: input.photosPath,

    });

    const photos: string[] = [];

    for (const photo of input.photosPath){

        const photoInBase64 = await this.fileService.readFile(photo)
        const photoBase64 = photoInBase64.toString('base64')
        photos.push(photoBase64)
    }
    return new UpdatePetManyPhotosByIdUseCaseOutput({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      size: pet.size,
      gender: pet.gender,
      bio: pet.bio,
      photos: photos,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
    });
  }

  private async getPetById(id: string): Promise<Pet> {
    try {
      return await this.petRepository.getById(id);
    } catch (error) {
      return null;
    }
  }
}
