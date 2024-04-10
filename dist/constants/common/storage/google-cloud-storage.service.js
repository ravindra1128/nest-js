"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("@google-cloud/storage");
const logger_1 = require("../../../config/logger");
const QRCode = require("qrcode");
let UploadService = class UploadService {
    constructor() {
        this.storage = new storage_1.Storage({
            keyFilename: 'src/constants/common/storage/google-cloud-storage.json',
        });
    }
    async uploadFile(file, bucketName) {
        try {
            logger_1.logger.info('=====uploadFile request initiated=====');
            return new Promise((resolve, reject) => {
                const currentBucket = bucketName && bucketName !== 'posts'
                    ? process.env.PROFILES_BUCKET_NAME
                    : process.env.POSTS_BUCKET;
                const bucket = this.storage.bucket(currentBucket);
                const blob = bucket.file(file.originalname);
                const blobStream = blob.createWriteStream({
                    resumable: false,
                });
                blobStream.on('error', (err) => {
                    logger_1.logger.error(err);
                    reject(err);
                });
                blobStream.on('finish', async () => {
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    logger_1.logger.info(publicUrl);
                    resolve(publicUrl);
                });
                blobStream.end(file.buffer);
            });
        }
        catch (error) {
            logger_1.logger.error(error);
            return error;
        }
    }
    async uploadQrCode(data, bucketName, isEvent = true) {
        try {
            logger_1.logger.info('=====uploadQRCode request initiated=====');
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
        }
        catch (error) {
            logger_1.logger.error(error);
            return error;
        }
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=google-cloud-storage.service.js.map