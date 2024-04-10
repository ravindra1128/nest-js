import { FirebaseApp } from '../firebase/firebase-app';
export declare class CommentsService {
    private readonly firebaseApp;
    constructor(firebaseApp: FirebaseApp);
    getComments(): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createComments(user: any, payload: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createLikes(itemId: string, payload: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    saveItem(itemId: string, payload: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
