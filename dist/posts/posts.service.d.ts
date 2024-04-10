import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
export declare class PostsService {
    private readonly firebaseApp;
    private uploadService;
    constructor(firebaseApp: FirebaseApp, uploadService: UploadService);
    getPost(page_: any, pageSize_: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createPost(itemId: string, user: any, payload: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
