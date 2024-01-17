import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { RoleModule } from '../role/role.module';
import { FileService } from '../file/file.service';
import { CartModule } from '../cart/cart.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [RoleModule, CartModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    UserService,
    FileService,
    PrismaService,
    ConfigService,
    MailService,
  ],
  exports: [UserService],
})
export class UserModule {}
