import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService as _MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  constructor(
    private mailerService: _MailerService,
    private readonly configService: ConfigService,
  ) {}

  // 회원 가입시 이메일 전송
  async signUpSendEmail(to: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to,
        from: this.configService.get<string>('MAIL_USER'),
        subject: '[career] 당신의 커리어 이야기가 시작됐어요 🚀',
        text: `
              `,
        html: `
        <p>안녕하세요 나는 AI예요 👋</p>
        <br>
        <p>Our service에 오신 걸 진심으로 환영해요!</p>
        <p>지금부터 당신의 경험과 커리어가 이야기가 되는 순간이 시작됩니다.</p>
        <br>
        <p>바로 시작해볼까요?</p>
        <hr>
        <p><a href="http://localhost:3000/users/check?email=${to}">이메일 인증</a></p>
        `,
      })
      .catch((error) => {
        console.error(error);
        throw new BadRequestException(error.response);
      });
  }

  // 이메일 인증 완료 했을 시에 완료 이메일 전송
  async doneVerifySendEmail(to: string) {
    await this.mailerService
      .sendMail({
        to,
        from: this.configService.get<string>('MAIL_USER'),
        subject: '[career] 당신의 커리어 이야기가 시작됐어요 🚀',
        text: `
              `,
        html: `
        <p>안녕하세요 👋 AI 입니다.</p>
        <br>
        <p>이메일 인증이 정상적으로 완료되었어요.</p>
        <p>이제 Our service의 모든 기능을 문제없이 이용하실 수 있어요.</p>
        <br>
        <p>당신의 커리어 이야기를 마음껏 펼쳐보세요. 🙌</p>
        `,
      })
      .catch((error) => {
        console.error(error);
        throw new BadRequestException(error.response);
      });
  }
}
