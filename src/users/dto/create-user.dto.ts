import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '이메일란을 입력해 주세요.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: '패스워드란을 입력해 주세요.' })
  @IsString()
  password: string;

  @IsEmpty()
  @IsString()
  name?: string;

  @IsEmpty()
  @IsString()
  nickname?: string;

  @IsEmpty()
  @IsNumber()
  gender?: number;

  @IsEmpty()
  @IsDate()
  birth?: Date;
}
