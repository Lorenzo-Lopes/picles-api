import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCase from './usecases/create.pet.usecase';
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

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase) 
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput,CreatePetUseCaseOutput>

    @Inject(PetTokens.getPetByIdUseCase) 
    private readonly getPetByIdUseCase: IUseCase<GetPetByIdUseCaseInput,GetPetByIdUseCaseOutput>

    @Inject(PetTokens.updatePetByIdUseCase) 
    private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>

    @Inject(PetTokens.deletePetByIdUseCase) 
    private readonly deletePetByIdUseCase: IUseCase<GetPetByIdUseCaseInput, DeletePetByIdUseCaseOutput>
    
    
    @Get(':id')
    async getPetById(@Param('id') id:string): Promise<GetPetByIdUseCaseOutput>{
        const useCaseInput = new GetPetByIdUseCaseInput({id})
        return await this.getPetByIdUseCase.run(useCaseInput)
        
    }   

    @Post()
    async createPet(@Body() input: CreatePetControllerInput,): Promise<CreatePetUseCaseOutput> {
        try{
            const useCaseInput = new CreatePetUseCaseInput({ ...input });
            return await this.createPetUseCase.run(useCaseInput);
        }catch(error){
            throw new BadRequestException(JSON.parse(error.message))
        }
    }
     @Put(':id')
     async updatePet(@Body() input:UpdatePetControllerInput, @Param('id') id:string): Promise<UpdatePetByIdUseCaseOutput> {

         try{
             const useCaseInput = new UpdatePetByIdUsecaseInput({
                  ...input,
                     id 
                 })  
             return await this.updatePetByIdUseCase.run(useCaseInput) 
         }catch(error){
             throw new BadRequestException(JSON.parse(error.message))
         }
    
     }

    //  @Put(':id')
    //  async updatePet(@Body() input: UpdatePetControllerInput, @Param('id') id: string): Promise<UpdatePetByIdUseCaseOutput> {
 
    //      try {
    //          const useCaseInput = new UpdatePetByIdUseCaseInput({
    //              ...input,
    //              id
    //          })
    //          return await this.updatePetByIdUseCase.run(useCaseInput)
    //      } catch (error) {
    //          throw new BadRequestException(JSON.parse(error.message))
    //      }
    //  }


    @Delete(':id')
    async deletePet(@Param('id')id:string){
        try{ 
            const useCaseInput = new DeletePetByIdUseCaseInput({id})
            return await this.deletePetByIdUseCase.run(useCaseInput)
        }catch(error){
            throw new BadRequestException(JSON.parse(error.message))

        }
        
    }
}
