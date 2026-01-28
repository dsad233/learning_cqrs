import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './users.repoository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateCommandHandler } from './handlers/users.create.command.handler';
import { User, UserDetail } from '@libs/.//entities';
import { UserCreateEventHandler } from './handlers/users.create.event.handler';
import { UserCreateQueryHandler } from './handlers/users.create.query.handler';
import { MailerModule } from 'src/mailer/mailer.module';
import { UserVerifyEventHandler } from './handlers/users.verify.event.handler';
import { UserVerifyCommandHandler } from './handlers/users.verify.command.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { RedisModule as _RedisModule } from 'src/redis/redis.module';
import { UserLoginQueryHandler } from './handlers/users.login.query.hanlder';
import { JwtModule } from 'src/jwt/jwt.module';
import { UserLoginCommandHandler } from './handlers/users.login.command.handler';
import { UserUpdateCommandHandler } from './handlers/users.update.command.handler';
import { UserInfoQueryHandler } from './handlers/users.info.query.handler';
import { ReissueCommandHandler } from './handlers/reissue.command.handler';

const CommandHandler = [
  UserCreateCommandHandler,
  UserLoginCommandHandler,
  UserVerifyCommandHandler,
  UserUpdateCommandHandler,
  UserInfoQueryHandler,
  ReissueCommandHandler,
];
const EventHandler = [UserCreateEventHandler, UserVerifyEventHandler];
const QueryHandler = [UserCreateQueryHandler, UserLoginQueryHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetail]),
    CqrsModule,
    MailerModule,
    _RedisModule.register(),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    ...CommandHandler,
    ...EventHandler,
    ...QueryHandler,
  ],
})
export class UsersModule {}
