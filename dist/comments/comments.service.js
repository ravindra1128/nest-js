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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const response_1 = require("../constants/utility/response");
const logger_1 = require("../config/logger");
const firebase_app_1 = require("../firebase/firebase-app");
let CommentsService = class CommentsService {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
    }
    async getComments() {
        try {
            logger_1.logger.info('=====getComments request initiated====');
            const reviews = await this.firebaseApp
                .firestore()
                .collection('comments')
                .get();
            const reviewArray = [];
            reviews.forEach((doc) => {
                reviewArray.push(Object.assign({ id: doc.id }, doc.data()));
            });
            logger_1.logger.info('Comments fetched successfully');
            return (0, response_1.api_response)(reviewArray, 200);
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 400);
        }
    }
    async createComments(user, payload) {
        try {
            logger_1.logger.info('=====createComment request initiated====');
            const { uid } = user;
            const userRecord = await this.firebaseApp.getAuth().getUser(uid);
            if (userRecord) {
                if (!userRecord) {
                    logger_1.logger.error('User not found');
                    return (0, response_1.api_response)([], 401, 'User not found');
                }
                const reviewPayload = Object.assign(Object.assign({}, payload), { owner: uid, createdAt: new Date(), updatedAt: new Date() });
                const review = await this.firebaseApp
                    .firestore()
                    .collection('comments')
                    .add(Object.assign({}, reviewPayload));
                await this.firebaseApp
                    .firestore()
                    .collection('comments')
                    .doc(review.id)
                    .update({
                    id: review.id,
                });
                logger_1.logger.info('Comment created successfully');
                return (0, response_1.api_response)(review, 201, 'Comment created successfully');
            }
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 400);
        }
    }
    async createLikes(itemId, payload) {
        try {
            logger_1.logger.info('=====createLike request initiated====');
            const review = await this.firebaseApp
                .firestore()
                .collection('likes')
                .add(Object.assign(Object.assign({}, payload), { itemId: itemId }));
            logger_1.logger.info('Like added successfully');
            return (0, response_1.api_response)(review, 201, 'Like addded successfully');
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 400);
        }
    }
    async saveItem(itemId, payload) {
        try {
            logger_1.logger.info('=====saveItem request initiated====');
            const review = await this.firebaseApp
                .firestore()
                .collection('saveditems')
                .add(Object.assign(Object.assign({}, payload), { itemId: itemId }));
            logger_1.logger.info('Item saved successfully');
            return (0, response_1.api_response)(review, 201, 'Item saved successfully');
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 400);
        }
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_app_1.FirebaseApp])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map