import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ProductsService } from './products.service'
import { RatingsService } from '../ratings/ratings.service'
import { CreateProductDto } from './dto/product.dto'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private ratingsService: RatingsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with filtering and pagination' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category name' })
  @ApiQuery({ name: 'brand', required: false, description: 'Filter by brand name' })
  @ApiQuery({ name: 'color', required: false, description: 'Filter by color name' })
  @ApiQuery({ name: 'size', required: false, description: 'Filter by size value' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimum price filter' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price filter' })
  @ApiQuery({ name: 'minRating', required: false, description: 'Minimum average rating filter' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Sort by: price, createdAt, rating' })
  @ApiQuery({ name: 'order', required: false, description: 'Sort order: asc or desc' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of results per page' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findAll(@Query() query: any) {
    return await this.productsService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id)
  }

  @Get(':id/ratings')
  @ApiOperation({ summary: 'Get ratings for a specific product' })
  @ApiResponse({ status: 200, description: 'Product ratings retrieved successfully' })
  async getProductRatings(@Param('id') id: string) {
    return await this.ratingsService.getProductRatings(id)
  }
}
