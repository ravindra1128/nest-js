import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postService;
    constructor(postService: PostsService);
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
