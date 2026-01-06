import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/iusers.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDetail } from 'libs/entities/userDetail.entity';

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
  async create(): Promise<undefined> {
    console.log('수행 완료.');
    // const user = this.users.create();
    // await this.users.save(user);
  }
}
