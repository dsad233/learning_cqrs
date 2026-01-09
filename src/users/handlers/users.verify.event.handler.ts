import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserVerifyEvent } from '../events/users.verify.event';
import { MailerService } from 'src/mailer/mailer.service';

@EventsHandler(UserVerifyEvent)
export class UserVerifyEventHandler implements IEventHandler<UserVerifyEvent> {
  constructor(private readonly mailerService: MailerService) {}

  async handle(event: UserVerifyEvent) {
    switch (event.name) {
      case UserVerifyEvent.name:
        await this.mailerService.doneVerifySendEmail(event.email);
        break;
      default:
        break;
    }
  }
}
