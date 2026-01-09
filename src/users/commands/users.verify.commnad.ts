import { ICommand } from '@nestjs/cqrs';

export class UserVerifyCommand implements ICommand {
  constructor(readonly email: string) {}
}
