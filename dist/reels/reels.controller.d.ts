import { ReelsService } from './reels.service';
export declare class ReelsController {
    private readonly reelsService;
    constructor(reelsService: ReelsService);
    createReview(itemId: string, req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    getReviews(page: string, pageSize: string, req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
