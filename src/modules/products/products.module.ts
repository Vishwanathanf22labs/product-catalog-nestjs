import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { Product } from './products.model'
import { ProductColor } from './product-colors.model'
import { ProductSize } from './product-sizes.model'
import { Rating } from '../ratings/ratings.model'
import { RatingsModule } from '../ratings/ratings.module'

@Module({
  imports: [
    SequelizeModule.forFeature([Product, ProductColor, ProductSize, Rating]),
    RatingsModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}