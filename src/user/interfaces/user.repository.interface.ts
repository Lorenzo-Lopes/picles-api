import { User } from "../schema/user.schema";

export default interface IUserRepository{
  getById(id:string): Promise<User>
  create(data:Partial<User>):Promise<User>
  updateById(data: Partial<User>):Promise<void>

}
