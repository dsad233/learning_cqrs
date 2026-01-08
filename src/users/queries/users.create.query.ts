import { IQuery } from '@nestjs/cqrs';

export class UserCreateQuery implements IQuery {
  constructor(
    readonly email: string,
    readonly nickname: string,
  ) {}
}
