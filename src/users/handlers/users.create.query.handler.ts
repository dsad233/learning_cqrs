import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserCreateQuery } from '../queries/users.create.query';
import { UsersService } from '../users.service';

@QueryHandler(UserCreateQuery)
export class UserCreateQueryHandler implements IQueryHandler<UserCreateQuery> {
  constructor(private readonly usersService: UsersService) {}

  async execute(query: UserCreateQuery): Promise<void> {
    // 유저 이메일 존재 여부 조회
    await this.usersService.existEmail(query.email);

    // 유저 닉네임 존재 여부 조회
    await this.usersService.existNickname(query.nickname);
  }
}
