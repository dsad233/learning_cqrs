import { User } from 'libs/entities/user.entity';
import { UserDetail } from 'libs/entities/userDetail.entity';
import { UsersCommand } from '../commands/users.command';

// users repository
export interface IUsersRepository {
  // 유저 이메일 존재 여부 확인
  existEmail(email: string): Promise<User | UserDetail>;
  // 유저 닉네임 존재 여부 확인
  existNickname(nickname: string): Promise<UserDetail>;
  // 유저 생성
  create(command: UsersCommand): Promise<undefined>;
}
