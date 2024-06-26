import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './schema/auth.schema';

@Module({
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([{name:Auth.name , schema: AuthSchema}])],
  providers:[
    // {
    //   provide:AuthTokens.getByEmialUserUseCase,
    //   useClass: CreateUserUseCase,
    // },
    // {
    //   provide: AuthTokens.,
    //   useClass: AuthRepository,
    // }
  ]
})
export class AuthModule {}
