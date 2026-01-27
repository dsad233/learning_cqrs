import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '이메일란을 입력해 주세요.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: '패스워드를 입력해 주세요.' })
  @IsString()
  // 최소 4글자 이상
  @MinLength(4)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/, {
    message:
      '대문자 1자 이상, 특수문자 1자 이상, 8자 이상의 패스워드를 입력해 주세요.',
  })
  password: string;
}
