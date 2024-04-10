import { FeedsService } from './feeds.service';
export declare class FeedsController {
    private readonly feedsService;
    constructor(feedsService: FeedsService);
    createFeed(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    getFeeds(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
