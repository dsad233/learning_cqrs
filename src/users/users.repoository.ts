import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateCommand } from './commands/users.create.command';
import { STATUS } from '@libs/.//enums';
import { UserLoginQuery } from './queries/users.login.query';
import { User, UserDetail } from '@libs/entities';
import { UserUpdateCommand } from './commands/users.update.command';
import { UserInfoQuery } from './queries/users.info.query';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(UserDetail)
    private userDetails: Repository<UserDetail>,
  ) {}
  // 유저 이메일 존재 여부 확인
  async existEmail(email: string): Promise<User> {
    return await this.users.findOneBy({ email: email });
  }

  // 유저 닉네임 존재 여부 확인
  async existNickname(nickname: string): Promise<UserDetail> {
    return await this.userDetails.findOneBy({ nickname: nickname });
  }

  // 유저 상세 조회
  async findOne(query: UserInfoQuery): Promise<User> {
    return await this.users.findOne({
      where: {
        email: query.email,
      },
      relations: {
        userDetail: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        userDetail: {
          nickname: true,
          gender: true,
          birth: true,
        },
      },
    });
  }

  // 이메일을 이용한 유저 조회
  async findByEmail(query: UserLoginQuery): Promise<User> {
    return await this.users.findOne({
      where: {
        email: query.email,
      },
      relations: {
        userDetail: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        userDetail: {
          nickname: true,
        },
      },
    });
  }

  // 유저 생성
  async create(command: UserCreateCommand): Promise<void> {
    const user = this.users.create({
      email: command.email,
      password: command.password,
      name: command.name,
      userDetail: new UserDetail(
        command.nickname,
        command.gender,
        command.birth,
      ),
    });

    await this.users.save(user);
  }

  // 이메일 인증 여부 확인
  async alreadyCheckEmail(email: string): Promise<User> {
    return await this.users.findOne({
      where: { email: email },
      select: {
        verified: true,
      },
    });
  }

  // 이메일 인증 여부 변경
  async checkEmail(email: string): Promise<void> {
    await this.users.update(
      { email: email },
      {
        verified: STATUS.BooleanStatus.TRUE,
      },
    );
  }

  // 업데이트
  async updateUser(command: UserUpdateCommand): Promise<void> {
    const user = await this.users.findOne({
      where: {
        email: command.email,
      },
      relations: { userDetail: true },
    });

    await this.users.update(user.id, {
      password: command.password,
      name: command.name,
    });

    await this.userDetails.update(user.userDetail.id, {
      nickname: command.nickname,
      gender: command.gender,
      birth: command.birth,
    });
  }
}
