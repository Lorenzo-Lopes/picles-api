import { IUseCase } from "src/domain/iusecase.interface";
import CreateUserUseCaseInput from "./dtos/create.user.usecase.input";
import CreateUserUseCaseOutput from "./dtos/create.user.usecase.output";
import { Inject } from "@nestjs/common";
import UserTokens from "../user.tokens";
import IPetRepository from "src/pet/interfaces/pet.repository.interface";
import IUserRepository from "../interfaces/user.repository.interface";

export default class CreateUserUseCase implements IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>{
  constructor(
     @Inject(UserTokens.userRepository)
     private readonly userRepository:IUserRepository,
    ){}

    async run (input:CreateUserUseCaseInput):Promise<CreateUserUseCaseOutput>{
      const newUser = await this.userRepository.create(input)
      console.log("aaaa", newUser)
      return new CreateUserUseCaseOutput({

        id: newUser._id,
        name:newUser.name,
        email:newUser.email,
        adress:newUser.adress,
        password:newUser.password,
        type:newUser.type,
        createdAt:newUser.createdAt,
        updatedAt:newUser.updatedAt,

      })
    }
}
