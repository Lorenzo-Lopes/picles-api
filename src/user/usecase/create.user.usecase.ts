import { IUseCase } from "src/domain/iusecase.interface";
import CreateUserUseCaseInput from "./dtos/create.user.usecase.input";
import CreateUserUseCaseOutput from "./dtos/create.user.usecase.output";
import { Inject } from "@nestjs/common";
import UserTokens from "../user.tokens";
import IPetRepository from "src/pet/interfaces/pet.repository.interface";
import IUserRepository from "../interfaces/user.repository.interface";
import encrypt from "src/services/encrypt";

export default class CreateUserUseCase implements IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>{
  constructor(
     @Inject(UserTokens.userRepository)
     private readonly userRepository:IUserRepository,
    ){}

    async run (input:CreateUserUseCaseInput):Promise<CreateUserUseCaseOutput>{
      const passwordEncrypted = await encrypt(input.password)
      const newUser = await this.userRepository.create({...input, password:passwordEncrypted.password, salt: passwordEncrypted.salt})
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
