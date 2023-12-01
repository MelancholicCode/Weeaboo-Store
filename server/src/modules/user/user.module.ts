import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { RoleModule } from '../role/role.module';
import { FileService } from '../file/file.service';

@Module({
  imports: [RoleModule],
  controllers: [UserController],
  providers: [UserService, FileService, PrismaService],
})
export class UserModule {}
