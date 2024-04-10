import { CommentsService } from './comments.service';
export declare class CommentsController {
    private readonly commentService;
    constructor(commentService: CommentsService);
    createComment(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    getComments(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createLikes(itemId: string, req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    saveItem(itemId: string, req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
