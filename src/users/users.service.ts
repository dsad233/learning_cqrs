import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repoository';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserCreateCommand } from './commands/users.create.command';
import { UserLoginQuery } from './queries/users.login.query';
import { STATUS, TYPE } from '@libs/.//enums';
import { UserUpdateCommand } from './commands/users.update.command';
import { JwtService } from 'src/jwt/jwt.service';
import { UserInfoQuery } from './queries/users.info.query';
import { User } from '@libs/entities';
import { LoginInterface } from './interfaces/login.interface';
import { ReissueCommand } from './commands/reissue.command';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  // 유저 이메일 중복 여부 조회
  async existEmail(email: string): Promise<void> {
    const alreadyEmail = await this.usersRepository.existEmail(email);

    if (alreadyEmail) {
      throw new BadRequestException('이미 존재하는 이메일 입니다.');
    }
  }

  // 유저 닉네임 존재 여부 조회
  async existNickname(nickname: string): Promise<void> {
    const alreadyNickname = await this.usersRepository.existNickname(nickname);

    if (alreadyNickname) {
      throw new BadRequestException('이미 존재하는 닉네임 입니다.');
    }
  }

  // 유저 정보 조회
  async findOne(query: UserInfoQuery): Promise<User> {
    const user = await this.usersRepository.findOne(query);

    if (!user) {
      throw new BadRequestException('존재하지 않는 유저 입니다.');
    }

    return user;
  }

  // 유저 로그인 정보 조회
  async login(query: UserLoginQuery): Promise<LoginInterface> {
    const user = await this.usersRepository.findByEmail(query);

    if (!user) {
      throw new BadRequestException('존재하지 않는 유저 입니다.');
    }

    await this.comparePassword(query.password, user.password);

    return {
      accessToken: await this.jwtService.sign(
        {
          email: user.email,
          name: user.name,
          nickname: user.userDetail.nickname,
        },
        TYPE.TokenTypeEnum.ACCESS,
      ),
      refreshToken: await this.jwtService.sign(
        {
          email: user.email,
          name: user.name,
          nickname: user.userDetail.nickname,
        },
        TYPE.TokenTypeEnum.REFRESH,
      ),
    };
  }

  // 유저 패스워드 해쉬
  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(
      password,
      Number(this.configService.get<number>('BCRYPT_SALT')),
    );
  }

  // 유저 패스워드 복호화
  async comparePassword(
    bodyPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    if (!(await bcrypt.compare(bodyPassword, hashPassword))) {
      throw new BadRequestException('올바르지 않은 패스워드 입니다.');
    }

    return true;
  }

  // 유저 생성
  async create(command: UserCreateCommand): Promise<void> {
    const newUsersCommand = new UserCreateCommand(
      command.email,
      await this.hashedPassword(command.password),
      command.name,
      command.nickname,
      command.gender,
      command.birth,
    );

    await this.usersRepository.create(newUsersCommand);
  }

  // 이메일 인증
  async certification(email: string): Promise<void> {
    const alreadyEmail = await this.usersRepository.alreadyCheckEmail(email);

    if (!alreadyEmail) {
      throw new BadRequestException('존재하지 않는 유저 입니다.');
    }

    // 이미 인증된 이메일 이라면, 확인 여부를 반환
    if (alreadyEmail.verified === STATUS.BooleanStatus.TRUE) {
      throw new BadRequestException('이미 인증된 이메일 입니다.');
    }

    await this.usersRepository.checkEmail(email);
  }

  // 유저 업데이트
  async updateUser(command: UserUpdateCommand): Promise<void> {
    await this.usersRepository.updateUser(command);
  }

  // 토큰 재발급
  async tokenReissue(command: ReissueCommand): Promise<LoginInterface> {
    const verifyToken = await this.jwtService.verifyAsync(
      command.refreshToken,
      TYPE.TokenTypeEnum.REFRESH,
    );

    if (!verifyToken) {
      throw new UnauthorizedException('올바르지 않은 토큰 입니다.');
    }

    const user = await this.usersRepository.findByEmail(verifyToken.email);

    if (!user) {
      throw new BadRequestException('존재하지 않는 유저 입니다.');
    }

    return {
      accessToken: await this.jwtService.sign(
        {
          email: user.email,
          name: user.name,
          nickname: user.userDetail.nickname,
        },
        TYPE.TokenTypeEnum.ACCESS,
      ),
      refreshToken: await this.jwtService.sign(
        {
          email: user.email,
          name: user.name,
          nickname: user.userDetail.nickname,
        },
        TYPE.TokenTypeEnum.REFRESH,
      ),
    };
  }
}
