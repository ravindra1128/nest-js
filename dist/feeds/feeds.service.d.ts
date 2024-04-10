import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
export declare class FeedsService {
    private readonly firebaseApp;
    private uploadService;
    constructor(firebaseApp: FirebaseApp, uploadService: UploadService);
    getFeeds(page_: any, pageSize_: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createFeed(user: any, payload: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
