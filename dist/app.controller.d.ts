import { AppService } from './app.service';
import { Request } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getRoot(request: Request): string;
    getHello(): string;
}
