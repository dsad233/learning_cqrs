import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserLoginQuery } from '../queries/users.login.query';
import { UsersService } from '../users.service';

@QueryHandler(UserLoginQuery)
export class UserLoginQueryHandler implements IQueryHandler<UserLoginQuery> {
  constructor(private readonly usersService: UsersService) {}
  async execute(query: UserLoginQuery): Promise<any> {
    await this.usersService.login(query);
  }
}
