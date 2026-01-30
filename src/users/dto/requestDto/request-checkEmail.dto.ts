import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestCheckEmailDto {
  @IsNotEmpty({ message: '이메일 값이 존재하지 않습니다. 다시 요청해 주세요.' })
  @IsEmail()
  @Expose({ name: 'email' })
  email: string;
}
