import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserInfoQuery } from '../queries/users.info.query';
import { UsersService } from '../users.service';

@QueryHandler(UserInfoQuery)
export class UserInfoQueryHandler implements IQueryHandler<UserInfoQuery> {
  constructor(private readonly usersService: UsersService) {}
  async execute(query: UserInfoQuery): Promise<object> {
    const user = await this.usersService.findOne(query);
    return { message: '유저 상세 조회 완료.', data: user };
  }
}
