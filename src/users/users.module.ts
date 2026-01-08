import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './controllers/users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersRepository } from './users.repoository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateHandler } from './handlers/users.create.handler';
import { User, UserDetail } from 'libs/entities';
import { UserCreateEventHandler } from './handlers/users.create.event.handler';
import { UserCreateQueryHandler } from './handlers/users.create.query.handler';
import { MailerModule } from 'src/mailer/mailer.module';

const CommandHandler = [UserCreateHandler];
const EventHandler = [UserCreateEventHandler];
const QueryHandler = [UserCreateQueryHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetail]),
    CqrsModule,
    MailerModule,
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
