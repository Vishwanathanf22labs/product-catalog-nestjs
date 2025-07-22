import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { RatingsService } from './ratings.service'

class CreateRatingDto {
  product_id: string
  user_id: string
  value: number
}

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rating' })
  @ApiBody({ type: CreateRatingDto })
  @ApiResponse({ status: 201, description: 'Rating created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() body: CreateRatingDto) {
    return await this.ratingsService.create(body.product_id, body.user_id, body.value)
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get ratings for a product' })
  @ApiResponse({ status: 200, description: 'Ratings retrieved successfully' })
  async getProductRatings(@Param('productId') productId: string) {
    return await this.ratingsService.getProductRatings(productId)
  }
} 