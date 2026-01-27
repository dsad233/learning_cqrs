import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserUpdateCommand } from '../commands/users.update.command';
import { UsersService } from '../users.service';

@CommandHandler(UserUpdateCommand)
export class UserUpdateCommandHandler implements ICommandHandler<UserUpdateCommand> {
  constructor(private readonly usersService: UsersService) {}
  async execute(command: UserUpdateCommand): Promise<any> {
    await this.usersService.updateUser(command);

    return { message: '유저 업데이트 완료.' };
  }
}
