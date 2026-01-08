import { Module } from '@nestjs/common';
import { MailerModule as _MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './mailer.service';
import { MailerConfig } from './mailer.config';

@Module({
  imports: [
    _MailerModule.forRootAsync({
      useClass: MailerConfig,
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
