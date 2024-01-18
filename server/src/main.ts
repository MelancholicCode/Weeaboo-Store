import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    extensions: ['jpg'],
  });
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
  });
  await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
}
bootstrap();
