import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/iusers.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDetail } from 'libs/entities/userDetail.entity';
import { UserCreateCommand } from './commands/users.create.command';

@Injectable()
export class UsersRepository implements IUsersRepository {
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

  // 유저 생성
  async create(command: UserCreateCommand): Promise<void> {
    const user = this.users.create({
      email: command.email,
      password: command.password,
      name: command.name,
    });

    await this.users.save(user);

    const userDetail = this.userDetails.create({
      id: user.id,
      nickname: command.nickname,
      gender: command.gender,
      birth: command.birth,
    });

    await this.userDetails.save(userDetail);
  }
}
