import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewService;
    constructor(reviewService: ReviewsService);
    createReview(eventId: string, req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    getReviews(eventId: string, req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
