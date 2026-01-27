import Redis from 'ioredis';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisRepository implements OnModuleDestroy {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  onModuleDestroy() {
    console.log('redis 종료');
    this.redis.end();
    process.exit();
  }

  async get(key: string) {
    return await this.redis.get(key);
  }

  async set(key: string, value: string) {
    await this.redis.set(key, value);
  }

  async setex(key: string, ttl: number, value: string) {
    await this.redis.setex(key, ttl, value);
  }
}
