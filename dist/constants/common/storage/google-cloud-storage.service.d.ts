/// <reference types="multer" />
export declare class UploadService {
    private storage;
    uploadFile(file: Express.Multer.File, bucketName?: any): Promise<string>;
    uploadQrCode(data: any, bucketName: any, isEvent?: boolean): Promise<string>;
}
