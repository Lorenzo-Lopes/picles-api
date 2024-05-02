import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocment = HydratedDocument<User>;
@Schema({
  versionKey: false,
})

export class User {
  @Prop({ required: true, auto: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  adress: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)
