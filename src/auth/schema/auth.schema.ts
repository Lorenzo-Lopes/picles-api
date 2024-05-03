import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/user/schema/user.schema";

export type UserDocment = HydratedDocument<Auth>;
@Schema({
  versionKey:false,
})
export class Auth extends User{}

export const AuthSchema = SchemaFactory.createForClass(Auth)
