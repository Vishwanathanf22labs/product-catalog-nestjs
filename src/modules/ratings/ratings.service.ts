import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Rating } from './ratings.model'

@Injectable()
export class RatingsService {
  constructor(@InjectModel(Rating) private ratingModel: typeof Rating) {}

  async create(productId: string, userId: string, value: number) {
    return await this.ratingModel.create({
      product_id: productId,
      user_id: userId,
      value: value
    } as any)
  }

  async findByProductId(productId: string) {
    return await this.ratingModel.findAll({
      where: { product_id: productId }
    })
  }

  async getAverageRating(productId: string) {
    const ratings = await this.findByProductId(productId)
    if (ratings.length === 0) return 0
    const sum = ratings.reduce((acc, rating) => acc + rating.value, 0)
    return sum / ratings.length
  }

  async getProductRatings(productId: string) {
    const ratings = await this.findByProductId(productId)
    const averageRating = await this.getAverageRating(productId)
    return {
      ratings,
      averageRating,
      totalRatings: ratings.length
    }
  }
} 