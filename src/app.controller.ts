import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get app info' })
  @ApiResponse({ status: 200, description: 'App info retrieved successfully' })
  getHello(): string {
    return this.appService.getHello()
  }
}
