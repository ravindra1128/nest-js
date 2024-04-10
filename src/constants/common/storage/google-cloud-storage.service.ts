// upload.service.ts

import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { logger } from '../../../config/logger';
import * as QRCode from 'qrcode';

@Injectable()
export class UploadService {
  private storage = new Storage({
    keyFilename: 'src/constants/common/storage/google-cloud-storage.json',
  });

  async uploadFile(file: Express.Multer.File, bucketName?): Promise<string> {
    try {
      logger.info('=====uploadFile request initiated=====');
      return new Promise((resolve, reject) => {
        const currentBucket =
          bucketName && bucketName !== 'posts'
            ? process.env.PROFILES_BUCKET_NAME
            : process.env.POSTS_BUCKET;
        const bucket = this.storage.bucket(currentBucket);

        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        blobStream.on('error', (err) => {
          logger.error(err);
          reject(err);
        });

        blobStream.on('finish', async () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          logger.info(publicUrl);
          resolve(publicUrl);
        });

        blobStream.end(file.buffer);
      });
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  async uploadQrCode(data, bucketName, isEvent = true): Promise<string> {
    try {
      logger.info('=====uploadQRCode request initiated=====');
      const qrcodeDataUrl = await QRCode.toDataURL(data);
      return new Promise((resolve, reject) => {
        const fileName = isEvent
          ? `${data}_event_ticket_qrcode.png`
          : `${data}_qrcode.png`;
        const file = this.storage.bucket(bucketName).file(fileName);
        const fileBuffer = Buffer.from(qrcodeDataUrl.split(',')[1], 'base64');
        file.save(fileBuffer, {
          metadata: {
            contentType: 'image/png',
          },
        });

        const qrCode = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        resolve(qrCode);
      });
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
