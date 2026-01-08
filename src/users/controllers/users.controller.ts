import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserCreateCommand } from '../commands/users.create.command';

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
}
