import { CacheModuleOptions } from "@nestjs/cache-manager";
import { registerAs } from "@nestjs/config";
import * as redisStore from 'cache-manager-ioredis';

export default registerAs('redis', (): CacheModuleOptions =>({
    store: redisStore,
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
    ttl: parseInt(process.env.REDIS_TTL!)
}))