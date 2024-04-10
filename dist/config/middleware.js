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
var AuthMiddleware_1, EventMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMiddleware = exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase_app_1 = require("../firebase/firebase-app");
let AuthMiddleware = AuthMiddleware_1 = class AuthMiddleware {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        this.auth = firebaseApp.getAuth();
    }
    use(req, res, next) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.auth
                .verifyIdToken(token.replace('Bearer ', ''))
                .then(async (decodedToken) => {
                req['user'] = {
                    uid: decodedToken.uid,
                    email: decodedToken.email,
                    role: decodedToken.userRole || null,
                    type: decodedToken.type,
                };
                next();
            })
                .catch(() => {
                AuthMiddleware_1.accessDenied(req.url, res);
            });
        }
        else {
            AuthMiddleware_1.accessDenied(req.url, res);
        }
    }
    static accessDenied(url, res) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Please provide the valid token',
        });
    }
};
AuthMiddleware = AuthMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_app_1.FirebaseApp])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
let EventMiddleware = EventMiddleware_1 = class EventMiddleware {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        this.auth = firebaseApp.getAuth();
        this.ROLES = ['user', 'promoter'];
    }
    use(req, res, next) {
        if (req.user) {
            if (req.user['role'] === this.ROLES[1]) {
                next();
            }
            else {
                EventMiddleware_1.accessDenied(req.url, res);
            }
        }
        else {
            EventMiddleware_1.accessDenied(req.url, res);
        }
    }
    static accessDenied(url, res) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'You don not have permission to perform this action',
        });
    }
};
EventMiddleware = EventMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_app_1.FirebaseApp])
], EventMiddleware);
exports.EventMiddleware = EventMiddleware;
//# sourceMappingURL=middleware.js.map