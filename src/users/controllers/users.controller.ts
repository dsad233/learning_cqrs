import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserCreateCommand } from '../commands/users.create.command';
import { UserVerifyCommand } from '../commands/users.verify.commnad';
import { LoginDto } from '../dto/logindto';
import { UserLoginCommand } from '../commands/users.login.command';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserUpdateCommand } from '../commands/users.update.command';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  // 유저 생성
  @Post('')
  async create(
    @Body() { email, password, name, nickname, gender, birth }: CreateUserDto,
  ): Promise<any> {
    return await this.commandBus.execute(
      new UserCreateCommand(email, password, name, nickname, gender, birth),
    );
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto): Promise<any> {
    return await this.commandBus.execute(new UserLoginCommand(email, password));
  }

  // 이메일 체크
  @Get('email/check')
  async checkEmail(@Query('email') email: string): Promise<any> {
    return await this.commandBus.execute(new UserVerifyCommand(email));
  }

  // 유저 정보 업데이트
  @Patch()
  async update(
    @Query('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.commandBus.execute(
      new UserUpdateCommand(
        userId,
        updateUserDto.password,
        updateUserDto.name,
        updateUserDto.nickname,
        updateUserDto.gender,
        updateUserDto.birth,
      ),
    );
  }
}
