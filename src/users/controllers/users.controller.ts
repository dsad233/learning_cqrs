import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
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
import { ReqUser } from 'src/common/decorator/user.info.decorator';
import { ReissueCommand } from '../commands/reissue.command';
import { isPublic } from 'src/common/decorator/isPublic.decorator';
import { RequestReissueDto } from '../dto/requestDto/request-reissue.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { RequestCheckEmailDto } from '../dto/requestDto/request-checkEmail.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // 유저 생성
  @isPublic()
  @Post()
  async create(
    @Body() { email, password, name, nickname, gender, birth }: CreateUserDto,
  ): Promise<object> {
    return await this.commandBus.execute(
      new UserCreateCommand(email, password, name, nickname, gender, birth),
    );
  }

  // 유저 상세 조회
  @Get('myinfo')
  async findOne(
    @ReqUser('email')
    email: string,
  ): Promise<object> {
    return await this.queryBus.execute(new UserInfoQuery(email));
  }

  // 로그인
  @isPublic()
  @Post('login')
  async login(@Body() { email, password }: LoginDto): Promise<object> {
    return await this.commandBus.execute(new UserLoginCommand(email, password));
  }

  // 이메일 체크
  @isPublic()
  @Get('email/check')
  async checkEmail(@Query('email') email: string): Promise<object> {
    const parseDto = plainToInstance(
      RequestCheckEmailDto,
      {
        email: email,
      },
      {
        excludeExtraneousValues: true,
      },
    );

    await validateOrReject(parseDto);
    return await this.commandBus.execute(new UserVerifyCommand(parseDto.email));
  }

  // 유저 정보 업데이트
  @Patch()
  async update(
    @ReqUser('email')
    email: string,
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
  @isPublic()
  @Post('reissue')
  async reissueToken(@Headers() headers: Headers): Promise<object> {
    const parseDto = plainToInstance(RequestReissueDto, headers, {
      excludeExtraneousValues: true,
    });

    await validateOrReject(parseDto);
    return await this.commandBus.execute(
      new ReissueCommand(parseDto.refreshToken),
    );
  }
}
