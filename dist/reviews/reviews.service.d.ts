import { CreateReviewDTo } from '../database/dto/review.dto';
import { FirebaseApp } from '../firebase/firebase-app';
export declare class ReviewsService {
    private readonly firebaseApp;
    constructor(firebaseApp: FirebaseApp);
    getReviews(eventId: string): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createReview(eventId: string, user: any, payload: CreateReviewDTo): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
