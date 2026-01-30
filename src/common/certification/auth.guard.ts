import { TYPE } from '@libs/enums';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from 'src/jwt/jwt.service';
import { authKey } from '../decorator/user.info.decorator';
import { Reflector } from '@nestjs/core';
import { isPublicKey } from '../decorator/isPublic.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(isPublicKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        '토큰이 존재하지 않습니다. 다시 로그인 해주세요.',
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        TYPE.TokenTypeEnum.ACCESS,
      );
      request[authKey] = payload;
    } catch {
      throw new UnauthorizedException('올바르지 않은 유저 정보 입니다.');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
