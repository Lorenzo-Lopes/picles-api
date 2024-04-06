export default class UpdateShelterDetailsUseCaseInput{
    name: string;
    whatsApp:string;
    email:string;
    phone:string;
    createdAt:Date;
    Updatedat: Date;

    constructor (data:Partial<UpdateShelterDetailsUseCaseInput>){
        Object.assign(this, data);
    }
    
}