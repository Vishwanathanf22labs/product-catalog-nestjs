import { Controller, Get } from '@nestjs/common'
import { CategoriesService } from './categories.service'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    try {
      return await this.categoriesService.findAll()
    } catch (e) {
      return { error: e.message }
    }
  }
}