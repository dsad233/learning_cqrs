import {
  RedisModuleOptions,
  RedisModuleOptionsFactory,
} from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfig implements RedisModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createRedisModuleOptions(): Promise<RedisModuleOptions> | RedisModuleOptions {
    return {
      type: 'single',
      options: {
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
        db: this.configService.get<number>('REDIS_DB'),
        username: '',
        password: '',
      },
    };
  }
}
