import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { ProductModule } from './modules/product/product.module';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { CartModule } from './modules/cart/cart.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot(),
    CategoryModule,
    ProductModule,
    UserModule,
    RoleModule,
    CartModule,
    OrderModule,
    FavoriteModule,
    FileModule,
    AuthModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
