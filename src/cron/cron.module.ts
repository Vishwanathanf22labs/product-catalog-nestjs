import { Module } from '@nestjs/common'
import { CronService } from './cron.service'
import { CronController } from './cron.controller'
import { CategoriesModule } from '../modules/categories/categories.module'
import { BrandsModule } from '../modules/brands/brands.module'
import { ColorsModule } from '../modules/colors/colors.module'
import { SizesModule } from '../modules/sizes/sizes.module'
import { ProductsModule } from '../modules/products/products.module'
import { RatingsModule } from '../modules/ratings/ratings.module'

@Module({
  imports: [
    CategoriesModule,
    BrandsModule,
    ColorsModule,
    SizesModule,
    ProductsModule,
    RatingsModule
  ],
  providers: [CronService],
  controllers: [CronController],
  exports: [CronService]
})
export class CronModule {}