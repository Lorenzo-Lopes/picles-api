export default class CreatePetUseCaseOutput{
    name:string;
    type:string;
    size:string;
    gender:string;
    bio:string;
    photo:string;
    createdAt: Date;
    updated:Date;

    constructor(data: Partial<CreatePetUseCaseOutput>){
        Object.assign(this,data);
    }
}