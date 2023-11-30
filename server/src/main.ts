import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    extensions: ['jpg'],
  });
  app.enableCors();
  await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
}
bootstrap();
