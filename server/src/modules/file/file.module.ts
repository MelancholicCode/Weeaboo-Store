import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ConfigService } from '@nestjs/config';

@Module({ providers: [FileService, ConfigService] })
export class FileModule {}
