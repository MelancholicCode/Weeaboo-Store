import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { ProductModule } from './modules/product/product.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CategoryModule,
    ProductModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
