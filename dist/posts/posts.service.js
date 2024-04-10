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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const response_1 = require("../constants/utility/response");
const logger_1 = require("../config/logger");
const firebase_app_1 = require("../firebase/firebase-app");
const google_cloud_storage_service_1 = require("../constants/common/storage/google-cloud-storage.service");
let PostsService = class PostsService {
    constructor(firebaseApp, uploadService) {
        this.firebaseApp = firebaseApp;
        this.uploadService = uploadService;
    }
    async getPost(page_, pageSize_) {
        try {
            const pageSize = +pageSize_;
            const page = +page_;
            const offset = (page - 1) * pageSize;
            logger_1.logger.info('=====getPost request initiated====');
            const posts = await this.firebaseApp
                .firestore()
                .collection('posts')
                .orderBy('timestamp')
                .offset(offset)
                .limit(pageSize)
                .get();
            const postsArray = [];
            posts.forEach((doc) => {
                postsArray.push(Object.assign({ id: doc.id }, doc.data()));
            });
            logger_1.logger.info('Post fetched successfully');
            return (0, response_1.api_response)(postsArray, 200);
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 400);
        }
    }
    async createPost(itemId, user, payload) {
        try {
            logger_1.logger.info('=====createPost request initiated====');
            const { uid } = user;
            const userRecord = await this.firebaseApp.getAuth().getUser(uid);
            if (userRecord) {
                if (!userRecord) {
                    logger_1.logger.error('User not found');
                    return (0, response_1.api_response)([], 401, 'User not found');
                }
                const postPayload = Object.assign(Object.assign({}, payload), { owner: uid, createdAt: new Date(), updatedAt: new Date() });
                const post = await this.firebaseApp
                    .firestore()
                    .collection('posts')
                    .add(Object.assign({}, postPayload));
                const newPost = await this.firebaseApp
                    .firestore()
                    .collection('posts')
                    .doc(post.id);
                const uploadPost = await this.uploadService.uploadFile(payload.file, 'posts');
                if (uploadPost) {
                    logger_1.logger.info('fetched user successfully');
                    const getPosts = (await newPost.get()).data();
                    newPost.update({
                        id: post.id,
                        images: [...getPosts['images'], uploadPost],
                    });
                }
                logger_1.logger.info('Post created successfully');
                return (0, response_1.api_response)(post, 201, 'Post created successfully');
            }
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 400);
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_app_1.FirebaseApp,
        google_cloud_storage_service_1.UploadService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map