import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { UserLoginCommand } from '../commands/users.login.command';
import { UserLoginQuery } from '../queries/users.login.query';
import { UsersService } from '../users.service';

@CommandHandler(UserLoginCommand)
export class UserLoginCommandHandler implements ICommandHandler<UserLoginCommand> {
  constructor(
    private readonly usersService: UsersService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: UserLoginCommand): Promise<any> {
    const { email, password } = command;
    const userLoginQuery = new UserLoginQuery(email, password);

    // 유저 정보 조회
    await this.queryBus.execute(userLoginQuery);

    const { accessToken, refreshToken } =
      await this.usersService.login(userLoginQuery);

    return {
      message: '로그인 완료.',
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }
}
