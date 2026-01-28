import { IQuery } from '@nestjs/cqrs';

export class UserInfoQuery implements IQuery {
  constructor(readonly email: string) {}
}
