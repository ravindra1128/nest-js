import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { FirebaseApp } from '../firebase/firebase-app';
export declare class AuthMiddleware implements NestMiddleware {
    private firebaseApp;
    private auth;
    constructor(firebaseApp: FirebaseApp);
    use(req: Request, res: Response, next: () => void): void;
    private static accessDenied;
}
export declare class EventMiddleware implements NestMiddleware {
    private firebaseApp;
    private auth;
    private ROLES;
    constructor(firebaseApp: FirebaseApp);
    use(req: any, res: Response, next: () => void): void;
    private static accessDenied;
}
