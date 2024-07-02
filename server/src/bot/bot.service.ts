import { Injectable, OnModuleInit } from '@nestjs/common';
import IBot from 'node-telegram-bot-api';
const TelegramBot = require('node-telegram-bot-api');
import { DbService } from 'src/db/db.service';

@Injectable()
export class BotService implements OnModuleInit {
    private bot: IBot
    constructor(private readonly db: DbService){
        this.bot = new TelegramBot(process.env.BOT_API_TOKEN, {polling: true})
    }


    

     onModuleInit() {
        this.bot.on('message', (msg)=> {
            console.log(msg)
            
        })
    }
    
   
}