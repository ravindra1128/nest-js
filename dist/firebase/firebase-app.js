"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseApp = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("./firebase-config");
const firebase = require("firebase-admin");
require("firebase/auth");
let FirebaseApp = class FirebaseApp {
    constructor() {
        this.getAuth = () => {
            return this.firebaseApp.auth();
        };
        this.firestore = () => {
            return this.firebaseApp.firestore();
        };
        this.bucket = () => {
            return this.firebaseApp.storage().bucket();
        };
        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert(Object.assign({}, firebase_config_1.default)),
            databaseURL: process.env.DATABASE_URL,
        });
    }
};
FirebaseApp = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseApp);
exports.FirebaseApp = FirebaseApp;
//# sourceMappingURL=firebase-app.js.map