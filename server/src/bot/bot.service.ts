import { Injectable, OnModuleInit } from '@nestjs/common';
import IBot from 'node-telegram-bot-api';
const TelegramBot = require('node-telegram-bot-api');
import { DbService } from 'src/db/db.service';

@Injectable()
export class BotService implements OnModuleInit {
    private bot: IBot
    constructor(private readonly db: DbService) {
        this.bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, { polling: true })
    }

    onModuleInit() {
        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id
            const text = msg.text
            const webAppUrl = process.env.TELEGRAM_MINI_APP_URL
            if (text === '/start') {
                await this.bot.sendMessage(chatId, 'Ниже появится кнопка, заполните форму', {
                    reply_markup: {
                        keyboard: [
                            [{ text: 'Заполнить форму', web_app: { url: webAppUrl + '/form' } }]
                        ]
                    }
                })

                await this.bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Сделать заказ', web_app: { url: webAppUrl} }]
                        ]
                    }
                })
            }

            if (msg?.web_app_data?.data) {
                console.log(msg?.web_app_data?.data)
                try {
                    const data = JSON.parse(msg?.web_app_data?.data)
                    await this.bot.sendMessage(chatId, 'Спасибо за обратную связь!')
                    await this.bot.sendMessage(chatId, `Ваша страна: ${data?.country}`)
                    await this.bot.sendMessage(chatId, `Ваша улица: ${data?.street}`)
                    setTimeout(async () => {
                        await this.bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате')
                    }, 3000)
                } catch (e) {
                    console.error(e)
                }

            }

        })
    }
             
    async botQuery(data: any, queryId: any) {
        const {products, totalPrice} = data
        try {
            await this.bot.answerWebAppQuery(queryId, {
                type: 'article',
                id: queryId,
                title: 'Успешная покупка',
                input_message_content: {
                    message_text: `Поздравляем с покупкой, вы преобрели товаров на сумму ${totalPrice}`
                }

            } )
        } catch(e) {
            console.error(e)
        }
    }

}