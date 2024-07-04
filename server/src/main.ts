import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*', credentials: true })
  await app.listen(PORT || 5000, ()=> console.log(`server started at ${PORT}`));
}
bootstrap();
