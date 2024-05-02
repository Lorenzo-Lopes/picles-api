export default class CreateUserUseCaseOutput{
  id: string;
  name: string;
  email: string;
  adress: string;
  password: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<CreateUserUseCaseOutput>){
    Object.assign(this, data)
  }
}
