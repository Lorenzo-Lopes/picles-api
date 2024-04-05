import { Shelter } from "../schemas/shelter.schema";

export default interface ISShelterRepository{
    get():Promise<Shelter>
}