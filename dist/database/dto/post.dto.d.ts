/// <reference types="multer" />
export declare class CreatePostDTO {
    user_id: string;
    image: Express.Multer.File;
    text: string;
    like_count: number;
    comment_count: number;
    save_count: number;
    share_count: Date;
    timestamp: Date;
}
