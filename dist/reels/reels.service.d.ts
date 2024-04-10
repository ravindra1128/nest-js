import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
export declare class ReelsService {
    private readonly firebaseApp;
    private uploadService;
    constructor(firebaseApp: FirebaseApp, uploadService: UploadService);
    getReels(page_: any, pageSize_: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createReel(itemId: string, user: any, payload: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
