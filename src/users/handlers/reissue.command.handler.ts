import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReissueCommand } from '../commands/reissue.command';
import { UsersService } from '../users.service';

@CommandHandler(ReissueCommand)
export class ReissueCommandHandler implements ICommandHandler<ReissueCommand> {
  constructor(private readonly usersService: UsersService) {}
  async execute(command: ReissueCommand): Promise<object> {
    const { accessToken, refreshToken } =
      await this.usersService.tokenReissue(command);
    return {
      message: '토큰 재발급 완료.',
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
