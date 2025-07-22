import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Brand } from './brands.model'
import { BrandsService } from './brands.service'
import { BrandsController } from './brands.controller'

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  providers: [BrandsService],
  controllers: [BrandsController],
  exports: [BrandsService]
})
export class BrandsModule {}