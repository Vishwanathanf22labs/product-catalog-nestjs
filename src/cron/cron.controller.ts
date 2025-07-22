import { Controller, Post, Get, UseGuards, Headers, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { CronService } from './cron.service';
import { ApiKeyGuard } from '../guards/api-key.guard';

@ApiTags('Cron')
@Controller('cron')
export class CronController {
  constructor(private cronService: CronService) {}

  @Post('trigger')
  @UseGuards(ApiKeyGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Trigger cron job manually' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'Your secret API key',
    required: true
  })
  @ApiResponse({ status: 200, description: 'Cron job triggered successfully' })
  @ApiResponse({ status: 403, description: 'Invalid or missing API key' })
  async trigger(@Headers('x-api-key') apiKey: string) {
    console.log(`Cron manually triggered by: ${apiKey}`)
    await this.cronService.triggerCron()
    return { message: 'Cron job executed' }
  }
}
