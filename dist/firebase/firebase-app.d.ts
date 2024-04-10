import * as firebase from 'firebase-admin';
import 'firebase/auth';
export declare class FirebaseApp {
    private firebaseApp;
    constructor();
    getAuth: () => firebase.auth.Auth;
    firestore: () => firebase.firestore.Firestore;
    bucket: () => import("@google-cloud/storage/build/cjs/src/bucket").Bucket;
}
