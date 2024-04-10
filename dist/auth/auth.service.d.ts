import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
import { CreateUserDto } from '../database/dto/user.dto';
export declare class AuthService {
    private readonly firebaseApp;
    private uploadService;
    constructor(firebaseApp: FirebaseApp, uploadService: UploadService);
    create(user: CreateUserDto): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    verifyToken(token: string): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    loginUser(email: string, password: string): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    sendPasswordResetEmail(email: string): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    resetPassword(email: string, newPassword: string): Promise<any>;
    getRoles(): Promise<any>;
}
