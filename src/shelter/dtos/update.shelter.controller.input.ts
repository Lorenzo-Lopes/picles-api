import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export default class UpdateShelterControlerInput {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    @Length(10,11)
    whatsapp: string;
    @IsNotEmpty()
    @IsNumberString()
    phone: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
