import { FirebaseApp } from 'firebase/firebase-app';
export declare class Badge {
    id?: string;
    name: string;
}
export declare class BadgeSeeder {
    private readonly firebaseApp;
    constructor(firebaseApp: FirebaseApp);
    seedCategories(): Promise<void>;
    private getBadgeByName;
}
