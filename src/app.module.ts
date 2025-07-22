import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ProductsModule } from './modules/products/products.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { BrandsModule } from './modules/brands/brands.module'
import { ColorsModule } from './modules/colors/colors.module'
import { SizesModule } from './modules/sizes/sizes.module'
import { RatingsModule } from './modules/ratings/ratings.module'
import { CronModule } from './cron/cron.module'
import { SeedModule } from './seed/seed.module'
import redisConfig from './config/redis.config'
import { CacheModule } from '@nestjs/cache-manager'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
      load: [redisConfig]
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>{
        return config.get('redis')
      },
    }),
     ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 2,
        },
      ],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT!) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'product_catalog',
      autoLoadModels: true,
      synchronize: true
    }),
    ScheduleModule.forRoot(),
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    ColorsModule,
    SizesModule,
    RatingsModule,
    CronModule,
    SeedModule
  ], providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}