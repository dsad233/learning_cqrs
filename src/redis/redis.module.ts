import { DynamicModule, Module } from '@nestjs/common';
import { RedisConfig } from './redis.config';
import { RedisRepository } from './redisRepository';
import { RedisModule as _RedisModule } from '@nestjs-modules/ioredis';

@Module({})
export class RedisModule {
  static register(): DynamicModule {
    return {
      module: RedisModule,
      imports: [
        _RedisModule.forRootAsync({
          useClass: RedisConfig,
        }),
      ],
      providers: [RedisRepository],
      exports: [RedisRepository],
    };
  }
}
