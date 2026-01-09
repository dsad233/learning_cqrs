import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'src/common/cqrs-event';

export class UserVerifyEvent extends CqrsEvent implements IEvent {
  constructor(readonly email: string) {
    super(UserVerifyEvent.name);
  }
}
