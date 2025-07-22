import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { ProductsService } from '../modules/products/products.service'
import { CategoriesService } from '../modules/categories/categories.service'
import { BrandsService } from '../modules/brands/brands.service'
import { ColorsService } from '../modules/colors/colors.service'
import { SizesService } from '../modules/sizes/sizes.service'
import { RatingsService } from '../modules/ratings/ratings.service'
import { Category } from '../modules/categories/categories.model'
import { Brand } from '../modules/brands/brands.model'
import { Color } from '../modules/colors/colors.model'
import { Size } from '../modules/sizes/sizes.model'

@Injectable()
export class CronService {
  constructor(
    private categoriesService: CategoriesService,
    private brandsService: BrandsService,
    private colorsService: ColorsService,
    private sizesService: SizesService,
    private productsService: ProductsService,
    private ratingsService: RatingsService
  ) {}

  async triggerCron() {
    const dataPath = path.join(process.cwd(), 'src/data/dummy-data.json')
    const dummyData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

    const categories: Category[] = []
    for (const categoryData of dummyData.categories) {
      const existing = await this.categoriesService.findByName(categoryData.name)
      categories.push(existing || await this.categoriesService.create(categoryData.name))
    }

    const brands: Brand[] = []
    for (const brandData of dummyData.brands) {
      const existing = await this.brandsService.findByName(brandData.name)
      brands.push(existing || await this.brandsService.create(brandData.name))
    }

    const colors: Color[] = []
    for (const colorData of dummyData.colors) {
      const existing = await this.colorsService.findByName(colorData.name)
      colors.push(existing || await this.colorsService.create(colorData.name))
    }

    const sizes: Size[] = []
    for (const sizeData of dummyData.sizes) {
      const existing = await this.sizesService.findByValue(sizeData.value)
      sizes.push(existing || await this.sizesService.create(sizeData.value))
    }

    const allProducts = await this.productsService.findAll({ limit: 1000 })
    const existingTitles = new Set(allProducts.products.map(p => p.title))

    for (const productData of dummyData.products) {
      if (existingTitles.has(productData.title)) continue

      const productDto = {
        title: productData.title,
        description: productData.description,
        price: productData.price,
        image_url: productData.image_url,
        stock_quantity: productData.stock_quantity,
        category_id: categories[productData.category_id - 1]?.id,
        brand_id: brands[productData.brand_id - 1]?.id,
        color_ids: (productData.colors || [])
          .filter((i: number) => typeof i === 'number' && i > 0 && i <= colors.length)
          .map((i: number) => colors[i - 1].id),
        size_ids: (productData.sizes || [])
          .filter((i: number) => typeof i === 'number' && i > 0 && i <= sizes.length)
          .map((i: number) => sizes[i - 1].id)
      }

      const product = await this.productsService.create(productDto)

      if (productData.ratings) {
        for (const rating of productData.ratings) {
          await this.ratingsService.create(product.id, rating.user_id, rating.value)
        }
      }
    }

    console.log('Cron job ran: new products inserted (skipped existing)')
  }
}
