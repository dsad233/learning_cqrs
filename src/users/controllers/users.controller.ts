import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserCreateCommand } from '../commands/users.create.command';
import { UserVerifyCommand } from '../commands/users.verify.commnad';
import { LoginDto } from '../dto/logindto';
import { UserLoginCommand } from '../commands/users.login.command';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserUpdateCommand } from '../commands/users.update.command';
import { UserInfoQuery } from '../queries/users.info.query';
import { AuthGuard } from 'src/common/certification/auth.guard';
import { ReqUser } from 'src/common/decorator/user.info.decorator';
import { ReissueCommand } from '../commands/reissue.command';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // 유저 생성
  @Post()
  async create(
    @Body() { email, password, name, nickname, gender, birth }: CreateUserDto,
  ): Promise<object> {
    return await this.commandBus.execute(
      new UserCreateCommand(email, password, name, nickname, gender, birth),
    );
  }

  // 유저 상세 조회
  @UseGuards(AuthGuard)
  @Get('myinfo')
  async findOne(@ReqUser('email') email: string): Promise<object> {
    return await this.queryBus.execute(new UserInfoQuery(email));
  }

  // 로그인
  @Post('login')
  async login(@Body() { email, password }: LoginDto): Promise<object> {
    return await this.commandBus.execute(new UserLoginCommand(email, password));
  }

  // 이메일 체크
  @Get('email/check')
  async checkEmail(@Query('email') email: string): Promise<object> {
    return await this.commandBus.execute(new UserVerifyCommand(email));
  }

  // 유저 정보 업데이트
  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @ReqUser('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<object> {
    return await this.commandBus.execute(
      new UserUpdateCommand(
        email,
        updateUserDto.password,
        updateUserDto.name,
        updateUserDto.nickname,
        updateUserDto.gender,
        updateUserDto.birth,
      ),
    );
  }

  // 토큰 재발급
  @Post('reissue')
  async reissueToken(
    @Headers('refreshToken') refreshToken: string,
  ): Promise<object> {
    return await this.commandBus.execute(new ReissueCommand(refreshToken));
  }
}
