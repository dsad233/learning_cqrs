import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'src/common/cqrs-event';

export class UserCreateEvent extends CqrsEvent implements IEvent {
  constructor(readonly receiveEmail: string) {
    super(UserCreateEvent.name);
  }
}
