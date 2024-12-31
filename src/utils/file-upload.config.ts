import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileUploadOption = () => {
  return {
    storage: diskStorage({
      destination: './assets/produk',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(
          new HttpException('Hanya gambar', HttpStatus.BAD_REQUEST),
          false,
        );
      }
      cb(null, true);
    },
  };
};
