import { IQuery } from '@nestjs/cqrs';

export class UserLoginQuery implements IQuery {
  constructor(
    readonly email: string,
    readonly password: string,
  ) {}
}
