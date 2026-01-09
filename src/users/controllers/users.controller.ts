import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserCreateCommand } from '../commands/users.create.command';
import { UserVerifyCommand } from '../commands/users.verify.commnad';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  // 유저 생성
  @Post('')
  async create(
    @Body() { email, password, name, nickname, gender, birth }: CreateUserDto,
  ) {
    return await this.commandBus.execute(
      new UserCreateCommand(email, password, name, nickname, gender, birth),
    );
  }

  // 이메일 체크
  @Get('check')
  async checkEmail(@Query('email') email: string) {
    return await this.commandBus.execute(new UserVerifyCommand(email));
  }
}
