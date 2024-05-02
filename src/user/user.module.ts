import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import UserTokens from './user.tokens';
import CreateUserUseCase from './usecase/create.user.usecase';
import UserRepository from './user.repository';

@Module({
  controllers: [UserController],
  imports :[MongooseModule.forFeature([{name: User.name , schema: UserSchema}])],
  providers: [
    {
      provide:UserTokens.createUserUseCase,
      useClass: CreateUserUseCase,
    },
    {
      provide: UserTokens.userRepository,
      useClass: UserRepository,
    }
  ],
})
export class UserModule {}
