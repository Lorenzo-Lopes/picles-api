import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schema/auth.schema';
import AuthTokens from './auth.tokens';

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
