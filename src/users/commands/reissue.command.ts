import { ICommand } from '@nestjs/cqrs';

export class ReissueCommand implements ICommand {
  constructor(readonly refreshToken: string) {}
}
