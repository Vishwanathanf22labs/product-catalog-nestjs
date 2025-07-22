import { ApiProperty } from '@nestjs/swagger'
import { CreateRatingDto } from '../../ratings/dto/rating.dto'

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro', description: 'Product title' })
  title: string

  @ApiProperty({ example: 'Latest iPhone with advanced camera system', description: 'Product description' })
  description: string

  @ApiProperty({ example: 999, description: 'Product price' })
  price: number

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Product image URL' })
  image_url: string

  @ApiProperty({ example: 50, description: 'Stock quantity' })
  stock_quantity: number

  @ApiProperty({ example: 'uuid-string', description: 'Category ID' })
  category_id: string

  @ApiProperty({ example: 'uuid-string', description: 'Brand ID' })
  brand_id: string

  @ApiProperty({ example: ['uuid1', 'uuid2'], description: 'Color IDs array' })
  color_ids: string[]

  @ApiProperty({ example: ['uuid1', 'uuid2'], description: 'Size IDs array' })
  size_ids: string[]

  @ApiProperty({
    type: [CreateRatingDto],
    required: false,
    description: 'Optional array of product ratings'
  })
  ratings?: CreateRatingDto[]
}

export class ProductResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  price: number

  @ApiProperty()
  image_url: string

  @ApiProperty()
  stock_quantity: number

  @ApiProperty()
  created_at: Date

  @ApiProperty()
  category: { name: string }

  @ApiProperty()
  brand: { name: string }

  @ApiProperty()
  colors: { name: string }[]

  @ApiProperty()
  sizes: { value: string }[]
}