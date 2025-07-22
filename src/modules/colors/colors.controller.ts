import { Controller, Get } from '@nestjs/common'
import { ColorsService } from './colors.service'

@Controller('colors')
export class ColorsController {
  constructor(private colorsService: ColorsService) {}

  @Get()
  async findAll() {
    try {
      return await this.colorsService.findAll()
    } catch (e) {
      return { error: e.message }
    }
  }
}