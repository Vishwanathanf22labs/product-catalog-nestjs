import { Injectable, OnModuleInit } from '@nestjs/common'
import { CategoriesService } from '../modules/categories/categories.service'
import { BrandsService } from '../modules/brands/brands.service'
import { ColorsService } from '../modules/colors/colors.service'
import { SizesService } from '../modules/sizes/sizes.service'
import { ProductsService } from '../modules/products/products.service'
import { RatingsService } from '../modules/ratings/ratings.service'
import { Sequelize } from 'sequelize-typescript'
import { Rating } from '../modules/ratings/ratings.model'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private categoriesService: CategoriesService,
    private brandsService: BrandsService,
    private colorsService: ColorsService,
    private sizesService: SizesService,
    private productsService: ProductsService,
    private ratingsService: RatingsService,
    private sequelize: Sequelize
  ) {}

  async onModuleInit() {
    await Rating.sync({ force: true })
    
    const dataPath = path.join(process.cwd(), 'src/data/dummy-data.json')
    const dummyData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    
    const categories = []
    for (const categoryData of dummyData.categories) {
      const existingCategory = await this.categoriesService.findByName(categoryData.name)
      if (existingCategory) {
        categories.push(existingCategory)
      } else {
        categories.push(await this.categoriesService.create(categoryData.name))
      }
    }
    
    const brands = []
    for (const brandData of dummyData.brands) {
      const existingBrand = await this.brandsService.findByName(brandData.name)
      if (existingBrand) {
        brands.push(existingBrand)
      } else {
        brands.push(await this.brandsService.create(brandData.name))
      }
    }
    
    const colors: any[] = []
    for (const colorData of dummyData.colors) {
      const existingColor = await this.colorsService.findByName(colorData.name)
      if (existingColor) {
        colors.push(existingColor)
      } else {
        colors.push(await this.colorsService.create(colorData.name))
      }
    }
    
    const sizes: any[] = []
    for (const sizeData of dummyData.sizes) {
      const existingSize = await this.sizesService.findByValue(sizeData.value)
      if (existingSize) {
        sizes.push(existingSize)
      } else {
        sizes.push(await this.sizesService.create(sizeData.value))
      }
    }
    
    for (const productData of dummyData.products) {
      const productDto = {
        title: productData.title,
        description: productData.description,
        price: productData.price,
        image_url: productData.image_url,
        stock_quantity: productData.stock_quantity,
        category_id: categories[productData.category_id - 1].id,
        brand_id: brands[productData.brand_id - 1].id,
        color_ids: productData.colors ? productData.colors.map((colorIndex: number) => colors[colorIndex - 1].id) : [],
        size_ids: productData.sizes ? productData.sizes.map((sizeIndex: number) => sizes[sizeIndex - 1].id) : []
      }
      
      const product = await this.productsService.create(productDto)
      
      if (productData.ratings) {
        for (const rating of productData.ratings) {
          await this.ratingsService.create(product.id, rating.user_id, rating.value)
        }
      }
    }
    
    console.log('Database seeded successfully with dummy data!')
  }
}