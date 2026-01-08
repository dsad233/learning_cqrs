import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { UserCreateCommand } from '../commands/users.create.command';
import { UsersService } from '../users.service';
import { UserCreateEvent } from '../events/users.create.event';
import { UserCreateQuery } from '../queries/users.create.query';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  constructor(
    private readonly usersService: UsersService,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UserCreateCommand) {
    // 존재 여부 판별
    await this.queryBus.execute(
      new UserCreateQuery(command.email, command.nickname),
    );

    // 이메일 전송 이벤트
    await this.eventBus.publish(new UserCreateEvent(command.email));

    await this.usersService.create(command);
    return { message: '회원 등록 완료.' };
  }
}
