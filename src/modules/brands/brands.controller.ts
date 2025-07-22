import { Controller, Get } from '@nestjs/common'
import { BrandsService } from './brands.service'

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  async findAll() {
    try {
      return await this.brandsService.findAll()
    } catch (e) {
      return { error: e.message }
    }
  }
}