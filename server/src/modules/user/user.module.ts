import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { RoleModule } from '../role/role.module';
import { FileService } from '../file/file.service';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [RoleModule, CartModule],
  controllers: [UserController],
  providers: [UserService, FileService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
