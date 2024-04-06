import { Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.input";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import { error } from "console";

@Injectable()
export default class UpdateShelterDetailsUseCase implements
IUseCase<UpdateShelterDetailsUseCaseInput, UpdateShelterDetailsUseCaseOutput>
{
    run(input:  UpdateShelterDetailsUseCaseInput):
    Promise<UpdateShelterDetailsUseCaseOutput>{
        throw new error("Method not Implemented")
    }
}