import { Body, Controller, Get, Inject, Patch, Put } from '@nestjs/common';
import getShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import { IUseCase } from 'src/domain/iusecase.interface';
import ShelterTokens from './shelter.tokens';
import UpdateShelterControlerInput from './dtos/update.shelter.controller.input';
import UpdateShelterDetailsUseCaseInput from './usecases/dtos/update.shelter.details.usecase.input';
import UpdateShelterDetailsUseCase from './usecases/update.shelter.details.usecase';

@Controller('shelter')
export class ShelterController {

  @Inject(ShelterTokens.getShelterDetailsUseCase)
  private readonly GetShelterDetailsUseCase: IUseCase<null, getShelterDetailsUseCaseOutput>

  @Inject(ShelterTokens.updateShelterDetailsUseCase)
  private readonly updatetShelterDetailsUseCase: IUseCase<UpdateShelterDetailsUseCaseInput, UpdateShelterDetailsUseCaseInput>

  @Get()
  async getShelterDetails():Promise<getShelterDetailsUseCaseOutput>{
    return await this.GetShelterDetailsUseCase.run(null)
  }

  @Put()
  async updateShelterDetails(@Body() input: UpdateShelterControlerInput):Promise<UpdateShelterDetailsUseCaseInput>{
    const useCaseInput = new UpdateShelterDetailsUseCaseInput({...input});
    return await this.updatetShelterDetailsUseCase.run(useCaseInput);
  }
}


// return new getShelterDetailsUseCaseOutput({
//   shelterName:'Acãochego',
//   shelterWhatsapp:'15998550238',
//   shelterEmail:'Acãochego@gmail.com',
//   shelterPhone:'15998550238',
//   createAt:new Date(),
//   updateAt:new Date()