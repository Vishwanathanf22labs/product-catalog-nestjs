import { Controller, Get } from '@nestjs/common'
import { SizesService } from './sizes.service'

@Controller('sizes')
export class SizesController {
  constructor(private sizesService: SizesService) {}

  @Get()
  async findAll() {
    try {
      return await this.sizesService.findAll()
    } catch (e) {
      return { error: e.message }
    }
  }
}