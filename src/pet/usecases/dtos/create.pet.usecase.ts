import { IUseCase } from "src/domain/iusecase.interface";
import CreatePetUseCaseOutput from "./create.pet.usecase.output";
import CreatePetUsecaseInput from "./create.pet.usecase.input";


export default class CreatePetUseCase implements IUseCase<CreatePetUsecaseInput, CreatePetUseCaseOutput>{
    run(input: CreatePetUsecaseInput): Promise<CreatePetUseCaseOutput> {
        throw new Error("Method not implemented")
        
    }
    
}