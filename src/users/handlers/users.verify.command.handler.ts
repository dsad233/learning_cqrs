import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserVerifyCommand } from '../commands/users.verify.commnad';
import { UserVerifyEvent } from '../events/users.verify.event';
import { UsersService } from '../users.service';

@CommandHandler(UserVerifyCommand)
export class UserVerifyCommandHandler implements ICommandHandler<UserVerifyCommand> {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UserVerifyCommand) {
    // 이메일 인증 완료시 상태 값 변경
    await this.usersService.certification(command.email);

    // 이메일 인증 완료 이벤트 전송
    await this.eventBus.publish(new UserVerifyEvent(command.email));

    return { message: '이메일 인증 완료.' };
  }
}
