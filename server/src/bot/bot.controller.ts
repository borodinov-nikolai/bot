import { Body, Controller, Post } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  getData(@Body() body) {
    console.log(body)
    const {products, totalPrice, queryId} = body
    this.botService.botQuery({products, totalPrice}, queryId)
  }
}
