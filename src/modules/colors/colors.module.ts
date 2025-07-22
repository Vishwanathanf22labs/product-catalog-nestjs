import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Color } from './colors.model'
import { ColorsService } from './colors.service'
import { ColorsController } from './colors.controller'

@Module({
  imports: [SequelizeModule.forFeature([Color])],
  providers: [ColorsService],
  controllers: [ColorsController],
  exports: [ColorsService]
})
export class ColorsModule {}