import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

export enum FileDirectory {
  PRODUCT_IMAGE = 'product-image',
  USER_AVATAR = 'user-avatar',
}

@Injectable()
export class FileService {
  createFile(fileDirectory: FileDirectory, file) {
    try {
      const extension = file.originalname.split('.').pop();
      const fileName = `${uuid.v4()}.${extension}`;
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        'static',
        fileDirectory,
      );
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return fileDirectory + '/' + fileName;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  removeFile(fileName: string) {
    try {
      fs.rmSync(
        path.resolve(__dirname, '..', '..', 'static', ...fileName.split('/')),
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
