import CreatePetUseCaseInput from "./create.pet.usecase.input";

export default class UpdatePetByIdUsecaseInput extends CreatePetUseCaseInput{

    id:string
    constructor(data:
    Partial<UpdatePetByIdUsecaseInput>){
        super(data)
        Object.assign(this,data)
        }
    


}