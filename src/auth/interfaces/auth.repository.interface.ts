import { Auth } from "../schema/auth.schema";

export default interface IAuthRepository{
  getByEmail(email:string): Promise<Auth>

}
