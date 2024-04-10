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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const firebase_app_1 = require("../firebase/firebase-app");
const google_cloud_storage_service_1 = require("../constants/common/storage/google-cloud-storage.service");
const logger_1 = require("../config/logger");
const response_1 = require("../constants/utility/response");
let ProfileService = class ProfileService {
    constructor(firebaseApp, uploadProfile) {
        this.firebaseApp = firebaseApp;
        this.uploadProfile = uploadProfile;
    }
    async getUserProfile(user) {
        try {
            logger_1.logger.info('=====getUserProfile request initiated====', user);
            const { role, uid } = user;
            const userRecord = await this.firebaseApp.getAuth().getUser(uid);
            if (userRecord) {
                const profileCollectionName = role === 'user' ? 'standardprofiles' : 'promoterprofiles';
                const userProfile = await this.firebaseApp
                    .firestore()
                    .collection(profileCollectionName)
                    .doc(user.uid)
                    .get();
                const getLookups = await this.firebaseApp
                    .firestore()
                    .collection('profilelookups')
                    .get();
                const lookups = [];
                getLookups.forEach((doc) => {
                    lookups.push(Object.assign({ id: doc.id }, doc.data()));
                });
                if (!userProfile.exists) {
                    logger_1.logger.error('User not found');
                    return (0, response_1.api_response)([], 400, 'User not found');
                }
                const data = userProfile.data();
                const selected_useage = lookups[0].useage.map((item) => data.selected_useage && data.selected_useage.includes(item)
                    ? { [item]: true }
                    : { [item]: false });
                const search_range = lookups[0].useage.map((item) => data.search_range && data.search_range.includes(item)
                    ? { [item]: true }
                    : { [item]: false });
                const userData = {
                    userId: data.id,
                    email: data.email,
                    name: data.name,
                    profile_images: data.profile_images,
                    search_range: search_range,
                    selected_useage: selected_useage,
                    profile_qrcode: data.qrCode,
                };
                logger_1.logger.info('fetched user profile updated');
                return (0, response_1.api_response)(userData, 200);
            }
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 400);
        }
    }
    async updateUserProfile(user, payload) {
        try {
            logger_1.logger.info('=====updateUserProfile request initiated====');
            const { role, uid } = user;
            const userRecord = await this.firebaseApp.getAuth().getUser(uid);
            if (userRecord) {
                const profileCollectionName = role === 'user' ? 'standardprofiles' : 'promoterprofiles';
                const userProfile = await this.firebaseApp
                    .firestore()
                    .collection(profileCollectionName)
                    .doc(uid)
                    .get();
                if (!userProfile.exists) {
                    logger_1.logger.error('User not found');
                    return (0, response_1.api_response)([], 401, 'User not found');
                }
                const updateUserRecord = await this.firebaseApp
                    .firestore()
                    .collection(profileCollectionName)
                    .doc(uid);
                updateUserRecord.update(Object.assign({}, payload));
                logger_1.logger.info('Profile updated');
                return (0, response_1.api_response)([], 201, 'Profile updated');
            }
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 400);
        }
    }
    async uploadFile(user, file) {
        try {
            logger_1.logger.info('=====uploadFile request initiated====');
            const profileCollectionName = user.role === 'user' ? 'standardprofiles' : 'promoterprofiles';
            const userProfile = await this.firebaseApp
                .firestore()
                .collection(profileCollectionName)
                .doc(user.uid);
            const uploadPofile = await this.uploadProfile.uploadFile(file);
            if (uploadPofile) {
                logger_1.logger.info('fetched user successfully');
                const getUserProfileImages = (await userProfile.get()).data();
                userProfile.update({
                    profile_images: [
                        ...getUserProfileImages['profile_images'],
                        uploadPofile,
                    ],
                });
                logger_1.logger.info('User profile uploaded successfully');
                return (0, response_1.api_response)([], 200, 'User profile uploaded successfully');
            }
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 400);
        }
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_app_1.FirebaseApp,
        google_cloud_storage_service_1.UploadService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map