import { TYPE } from '@libs/enums';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as _JwtService } from '@nestjs/jwt';

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
      });

      return refreshToken;
    }

    // refresh 타입이 아니라면, access 토큰 발급 처리
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return accessToken;
  }

  // jwt 토큰 복호화
  async verifyAsync(token: string, tokenType: string): Promise<any> {
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
  }
}
