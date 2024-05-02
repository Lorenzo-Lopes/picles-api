import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreateUserUseCaseInput from './usecase/dtos/create.user.usecase.input';
import CreateUserUseCaseOutput from './usecase/dtos/create.user.usecase.output';
import UserTokens from './user.tokens';

@Controller('user')
export class UserController {
  @Inject(UserTokens.createUserUseCase)
  private readonly createUserUseCase: IUseCase<
    CreateUserUseCaseInput,
    CreateUserUseCaseOutput
  >;

  @Post()
  async createUser(
    @Body() input: CreateUserUseCaseInput,
  ): Promise<CreateUserUseCaseOutput> {
    try {
      const useCaseInput = new CreateUserUseCaseInput({ ...input });
      return await this.createUserUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
