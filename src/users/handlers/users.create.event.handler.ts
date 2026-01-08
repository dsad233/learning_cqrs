import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreateEvent } from '../events/users.create.event';
import { MailerService } from 'src/mailer/mailer.service';

@EventsHandler(UserCreateEvent)
export class UserCreateEventHandler implements IEventHandler<UserCreateEvent> {
  constructor(private readonly mailerService: MailerService) {}

  async handle(event: UserCreateEvent): Promise<void> {
    switch (event.name) {
      case UserCreateEvent.name:
        // 이메일 전송
        await this.mailerService.sendEmail(event.receiveEmail);
        break;
      default:
        break;
    }
  }
}
