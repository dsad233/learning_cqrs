import { ICommand } from '@nestjs/cqrs';

export class UsersCommand implements ICommand {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly name: string,
    readonly nickname: string | null,
    readonly gender: number | null,
    readonly birth: Date | null,
  ) {}
}
