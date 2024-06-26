import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';

import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import PetTokens from './pet.tokens';
import GetPetByIdUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdUseCaseOutput from './usecases/dtos/get.pet.by.id.usecase.output';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetByIdUsecaseInput from './usecases/dtos/update.pet.by.id.usecase.input';
import UpdatePetByIdUseCaseOutput from './usecases/dtos/update.pet.by.id.usecase.output';
import DeletePetByIdUseCaseOutput from './usecases/dtos/delete.pet.by.id.usecase.output';
import UpdatePetByIdUseCaseInput from './usecases/dtos/update.pet.by.id.usecase.input';
import DeletePetByIdUseCaseInput from './usecases/dtos/delete.pet.by.id.usecase.input';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import multerConfig from 'src/conifg/multerConfig';
import UpdatePetPhotoByIdUseCaseInput from './usecases/dtos/update.pet.photo.by.id.usecase.input';
import UpdatePetPhotoByIdUseCaseOutput from './usecases/dtos/update.pet.photo.by.id.usecase.output';
import GetPetsUseCaseInput from './usecases/dtos/get.pets.usecase.input';
import GetPetsUseCaseOutput from './usecases/dtos/get.pets.usecase.output';
import UpdatePetManyPhotosByIdUseCaseInput from './usecases/dtos/update.pet.many.photos.usecase.input';
import UpdatePetManyPhotosByIdUseCaseOutput from './usecases/dtos/update.pet.many.photos.usecase.output';

@Controller('pet')
export class PetController {
  @Inject(PetTokens.createPetUseCase)
  private readonly createPetUseCase: IUseCase<
    CreatePetUseCaseInput,
    CreatePetUseCaseOutput
  >;

  @Inject(PetTokens.getPetByIdUseCase)
  private readonly getPetByIdUseCase: IUseCase<
    GetPetByIdUseCaseInput,
    GetPetByIdUseCaseOutput
  >;
  @Inject(PetTokens.getPetsUseCase)
  private readonly getPetsUseCase: IUseCase< GetPetsUseCaseInput, GetPetsUseCaseOutput>;


  @Inject(PetTokens.updatePetPhotoByIdUseCase)
  private readonly updatePetPhotoByIdUseCase: IUseCase<
    UpdatePetPhotoByIdUseCaseInput,
    UpdatePetPhotoByIdUseCaseOutput
    >;
  @Inject(PetTokens.updatePetManyPhotosByIdUseCase)
  private readonly updatePetManyPhotosByIdUseCase: IUseCase<
    UpdatePetManyPhotosByIdUseCaseInput,
    UpdatePetManyPhotosByIdUseCaseOutput
  >;

  @Inject(PetTokens.updatePetByIdUseCase)
  private readonly updatePetByIdUseCase: IUseCase<
    UpdatePetByIdUseCaseInput,
    UpdatePetByIdUseCaseOutput
  >;

  @Inject(PetTokens.deletePetByIdUseCase)
  private readonly deletePetByIdUseCase: IUseCase<
    GetPetByIdUseCaseInput,
    DeletePetByIdUseCaseOutput
  >;

  @Get(':id')
  async getPetById(@Param('id') id: string): Promise<GetPetByIdUseCaseOutput> {
    try {
      const useCaseInput = new GetPetByIdUseCaseInput({ id });
      return await this.getPetByIdUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }

  @Post()
  async createPet(
    @Body() input: CreatePetControllerInput,
  ): Promise<CreatePetUseCaseOutput> {
    try {
      const useCaseInput = new CreatePetUseCaseInput({ ...input });
      return await this.createPetUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }
  @Get()
  async getPets(
    @Query('type') type?: string,
    @Query('size') size?: string,
    @Query('gender') gender?: string,
    @Query('page') page?: string,
    @Query('itemsPerPage') itensPerPage?: string,
  ):Promise<GetPetsUseCaseOutput> {
    const FIRT_PAGE = 1;
    const DEFAULT_ITENS_PER_PAGE = 10;
    const useCaseInput = new GetPetsUseCaseInput({
      type: !!type ? type :null,
      size: !!size ? size :null,
      gender: !!gender ? gender :null,
      page: !!page ? parseInt(page) :FIRT_PAGE,
      itemsPerPage: !!itensPerPage ? parseInt(itensPerPage) :DEFAULT_ITENS_PER_PAGE,

    })
    return await this.getPetsUseCase.run(useCaseInput)
  }

  @Put(':id')
  async updatePet(
    @Body() input: UpdatePetControllerInput,
    @Param('id') id: string,
  ): Promise<UpdatePetByIdUseCaseOutput> {
    try {
      const useCaseInput = new UpdatePetByIdUsecaseInput({
        ...input,
        id,
      });
      return await this.updatePetByIdUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }

  @Delete(':id')
  async deletePet(@Param('id') id: string) {
    try {
      const useCaseInput = new DeletePetByIdUseCaseInput({ id });
      return await this.deletePetByIdUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }

  @Put(':id/photo')
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  async updatePhoto(
    @UploadedFile() photo: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const useCaseInput = new UpdatePetPhotoByIdUseCaseInput({
      id,
      photoPath: photo.path
    });
    return await this.updatePetPhotoByIdUseCase.run(useCaseInput);
  }


  @Put(':id/photos')
  @UseInterceptors(FilesInterceptor('photos',900, multerConfig ) )
  async updateManyPhoto(
    @UploadedFiles() photos:Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    console.log(photos)
    const useCaseInput = new UpdatePetManyPhotosByIdUseCaseInput({
      id,
      photosPath: photos.map(item=>photos.path.push(photos.path)),
    });
    return await this.updatePetManyPhotosByIdUseCase.run(useCaseInput);
  }

}
