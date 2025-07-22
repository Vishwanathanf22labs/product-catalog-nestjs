import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { RatingsController } from './ratings.controller'
import { RatingsService } from './ratings.service'
import { Rating } from './ratings.model'

@Module({
  imports: [SequelizeModule.forFeature([Rating])],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService]
})
export class RatingsModule {} 