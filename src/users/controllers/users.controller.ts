import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UsersCommand } from '../commands/users.command';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  // 유저 생성
  @Post('')
  async create(
    @Body() { email, password, name, nickname, gender, birth }: CreateUserDto,
  ) {
    return await this.commandBus.execute(
      new UsersCommand(email, password, name, nickname, gender, birth),
    );
  }
}
