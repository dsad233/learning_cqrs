import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    return {
      transport: {
        host: this.configService.get<string>('MAILER_HOST'),
        port: this.configService.get<number>('MAILER_PORT'),
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASSWORD'),
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    };
  }
}
