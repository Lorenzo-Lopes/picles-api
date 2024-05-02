import { IsEmail, IsString } from "class-validator";

export default class CreateUserUseCaseInput {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  adress: string;
  password: string;
  type: string;


  constructor(data: Partial<CreateUserUseCaseInput>){
    Object.assign(this, data)
  }
}
