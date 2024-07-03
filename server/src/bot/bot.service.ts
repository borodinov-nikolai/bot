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
        this.bot.on('message', async (msg)=> {
            const chatId = msg.chat.id
            const text = msg.text
            const webAppUrl = 'https://9e00-95-167-152-146.ngrok-free.app'
            if(text === '/start'){
                await this.bot.sendMessage(chatId, 'Ниже появится кнопка, заполните форму', {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
                            ]
                        }
                })
            }
            
        })
    }
    
   
}