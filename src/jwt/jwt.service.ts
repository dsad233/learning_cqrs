import { TYPE } from '@libs/enums';
import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  JwtService as _JwtService,
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: _JwtService,
    private readonly configService: ConfigService,
  ) {}

  // jwt 토큰 발급
  async sign(payload: object, tokenType: string): Promise<string> {
    // refresh 타입이라면 refresh 토큰 발급
    if (tokenType === TYPE.TokenTypeEnum.REFRESH) {
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1h',
      });

      return refreshToken;
    }

    // refresh 타입이 아니라면, access 토큰 발급 처리
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '7d',
    });

    return accessToken;
  }

  // jwt 토큰 복호화
  async verifyAsync(token: string, tokenType: string): Promise<any> {
    try {
      if (tokenType === TYPE.TokenTypeEnum.REFRESH) {
        // refresh 토큰 복호화 payload
        return await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        });
      }

      // access 토큰 복호화 payload
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException(
          '유효하지 않은 토큰입니다. 다시 로그인 해주세요.',
        );
      } else if (err instanceof NotBeforeError) {
        throw new UnauthorizedException('토큰이 사용되기 전에 요청되었습니다.');
      } else if (err instanceof TokenExpiredError) {
        throw new RequestTimeoutException(
          '토큰이 만료되었습니다. 다시 로그인 해주세요.',
        );
      } else {
        console.error('토큰 인증 오류 발생: ', err.message);
        throw new UnauthorizedException('올바르지 않은 토큰 입니다.');
      }
    }
  }
}
