import { Expose } from 'class-transformer';
import { IsNotEmpty, Matches } from 'class-validator';

export class RequestReissueDto {
  @IsNotEmpty({
    message: '리프래쉬 토큰이 존재하지 않습니다. 다시 요청해 주세요.',
  })
  @Matches(
    /e[yw][A-Za-z0-9-_]+\.(?:e[yw][A-Za-z0-9-_]+)?\.[A-Za-z0-9-_]{2,}(?:(?:\.[A-Za-z0-9-_]{2,}){2})?/,
    { message: '올바른 토큰이 아닙니다. 다시 요청해 주세요.' },
  )
  @Expose({ name: 'refreshtoken' })
  refreshToken: string;
}
