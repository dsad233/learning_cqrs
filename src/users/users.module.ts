import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './controllers/users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersRepository } from './users.repoository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersHandler } from './handlers/users.handler';
import { User, UserDetail } from 'libs/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDetail]), CqrsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersHandler],
})
export class UsersModule {}
