import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersCommand } from '../commands/users.command';
import { User } from 'libs/entities/user.entity';
import { UserDetail } from 'libs/entities/userDetail.entity';
import { UsersService } from '../users.service';

@CommandHandler(UsersCommand)
export class UsersHandler implements ICommandHandler<UsersCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute(command: UsersCommand): Promise<User | UserDetail> {
    // 유저 이메일 존재 여부 조회
    await this.usersService.existEmail(command.email);

    // 유저 닉네임 존재 여부 조회
    await this.usersService.existNickname(command.nickname);

    await this.usersService.create(command);
    return;
  }
}
