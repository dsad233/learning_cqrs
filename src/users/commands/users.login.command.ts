export class UserLoginCommand {
  constructor(
    readonly email: string,
    readonly password: string,
  ) {}
}
