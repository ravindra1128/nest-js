import { FirebaseApp } from 'firebase/firebase-app';
export declare class CategorySeeder {
    private readonly firebaseApp;
    constructor(firebaseApp: FirebaseApp);
    seedCategories(): Promise<void>;
    private getCategoryByName;
}
