import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { DbModule } from './db/db.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    BotModule,
    DbModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
