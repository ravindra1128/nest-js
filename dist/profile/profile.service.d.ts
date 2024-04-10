/// <reference types="multer" />
import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
import { UpdateUserDto } from '../database/dto/user.dto';
export declare class ProfileService {
    private readonly firebaseApp;
    private readonly uploadProfile;
    constructor(firebaseApp: FirebaseApp, uploadProfile: UploadService);
    getUserProfile(user: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    updateUserProfile(user: any, payload: UpdateUserDto): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    uploadFile(user: any, file: Express.Multer.File): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
