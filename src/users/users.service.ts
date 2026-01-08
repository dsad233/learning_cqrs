import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repoository';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserCreateCommand } from './commands/users.create.command';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private usersRepository: UsersRepository,
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

  // 유저 패스워드 해쉬
  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(
      password,
      Number(this.configService.get<number>('BCRYPT_SALT')),
    );
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
}
