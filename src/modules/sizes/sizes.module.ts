import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Size } from './sizes.model'
import { SizesService } from './sizes.service'
import { SizesController } from './sizes.controller'

@Module({
  imports: [SequelizeModule.forFeature([Size])],
  providers: [SizesService],
  controllers: [SizesController],
  exports: [SizesService]
})
export class SizesModule {}