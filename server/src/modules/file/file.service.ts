import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as uuid from 'uuid';

export enum FileType {
  PRODUCT_IMAGE = 'image/products',
  USER_AVATAR = 'image/avatars',
}

@Injectable()
export class FileService {
  private readonly s3Client = new S3Client({
    endpoint: this.configService.getOrThrow('YA_CLOUD_ENDPOINT'),
    region: this.configService.getOrThrow('YA_CLOUD_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('YA_CLOUD_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow(
        'YA_CLOUD_SECRET_ACCESS_KEY',
      ),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async createFile(type: FileType, file, bucket: string) {
    try {
      const fileName = uuid.v4() + '.jpg';

      const key = `${type}/${fileName}`;

      await this.uploadToS3(key, file.buffer, bucket);

      return `https://storage.yandexcloud.net/${bucket}/${type}/${fileName}`;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeFile(key: string, bucket: string) {
    try {
      console.log(
        await this.s3Client.send(
          new DeleteObjectCommand({ Key: key, Bucket: bucket }),
        ),
      );
      console.log(`File ${key} successfully deleted from S3 bucket ${bucket}`);
    } catch (error) {
      console.error(
        `Error deleting file ${key} from S3 bucket ${bucket}:`,
        error,
      );

      throw new InternalServerErrorException(
        `Error deleting file ${key} from S3 bucket ${bucket}`,
      );
    }
  }

  async uploadToS3(key: string, file: Buffer, bucket: string) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file,
      }),
    );
  }
}
