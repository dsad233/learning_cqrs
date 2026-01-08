import { Injectable } from '@nestjs/common';
import { MailerService as _MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  constructor(
    private mailerService: _MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendEmail(to: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to,
        from: this.configService.get<string>('MAIL_USER'),
        subject:
          '[tellmeaboutyourcareer] Congratulations on signing up for Our service!',
        text: 'welcome',
        // html: '<b>welcome</b>' // HTML body content
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
