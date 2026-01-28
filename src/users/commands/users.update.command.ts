import { ICommand } from '@nestjs/cqrs';

export class UserUpdateCommand implements ICommand {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly name: string | null,
    readonly nickname: string | null,
    readonly gender: number | null,
    readonly birth: Date | null,
  ) {}
}
