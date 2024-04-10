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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const firebase_app_1 = require("../firebase/firebase-app");
const google_cloud_storage_service_1 = require("../constants/common/storage/google-cloud-storage.service");
const logger_1 = require("../config/logger");
const response_1 = require("../constants/utility/response");
const axios_1 = require("axios");
let AuthService = class AuthService {
    constructor(firebaseApp, uploadService) {
        this.firebaseApp = firebaseApp;
        this.uploadService = uploadService;
    }
    async create(user) {
        const { email, password, role, name } = user;
        if (name.replace(/\s/g, '').length < 2) {
            logger_1.logger.error("Please enter a valid name");
            return (0, response_1.api_response)([], 400, "Please enter a valid name");
        }
        try {
            logger_1.logger.info('====create Request initiated====');
            const res = await this.firebaseApp
                .getAuth()
                .createUser({ email, password });
            const userRole = (await this.firebaseApp.firestore().collection('roles').doc(role).get()).data().role;
            await this.firebaseApp
                .getAuth()
                .setCustomUserClaims(res.uid, { userRole });
            try {
                delete user.password;
                delete user.role;
                const newRecord = await this.firebaseApp
                    .firestore()
                    .collection('User')
                    .doc(res.uid)
                    .set(Object.assign({ id: res.uid, role: userRole }, user));
                if (newRecord) {
                    logger_1.logger.info('User fetched from User collection');
                    const profileCollectionName = userRole === 'user' ? 'standardprofiles' : 'promoterprofiles';
                    const createUserProfile = await this.firebaseApp
                        .firestore()
                        .collection(profileCollectionName)
                        .doc(res.uid)
                        .set(Object.assign({ id: res.uid }, user));
                    if (userRole !== 'user') {
                        const getQrCode = await this.uploadService.uploadQrCode(res.uid, process.env.PROFILE_QR_CODE_BUCKET, false);
                        if (getQrCode) {
                            await this.firebaseApp
                                .firestore()
                                .collection('promoterprofiles')
                                .doc(res.uid)
                                .update({
                                qrCode: getQrCode,
                            });
                        }
                    }
                    if (createUserProfile) {
                        logger_1.logger.info('User registered successfully');
                        return (0, response_1.api_response)([], 201, 'User registerd successfully');
                    }
                }
            }
            catch (error) {
                logger_1.logger.error(error.message);
                return (0, response_1.api_response)([], 400, error.message);
            }
        }
        catch (error) {
            logger_1.logger.error(error.message);
            return (0, response_1.api_response)([], 400, error.message);
        }
    }
    async verifyToken(token) {
        try {
            logger_1.logger.info('====verifyToken Request initiated====');
            const res = await this.firebaseApp.getAuth().verifyIdToken(token);
            if (res) {
                logger_1.logger.info('Token Verified');
                return (0, response_1.api_response)(res, 201, 'Token verified successfully');
            }
        }
        catch (err) {
            logger_1.logger.error(err);
            return (0, response_1.api_response)(err, 401);
        }
    }
    async loginUser(email, password) {
        try {
            logger_1.logger.info('====loginUser Request initiated====');
            const res = await (0, axios_1.default)(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                },
            });
            if (res) {
                logger_1.logger.info('User logged in successfully');
                return (0, response_1.api_response)(res.data, res.data.status);
            }
        }
        catch (err) {
            logger_1.logger.error(err);
            return (0, response_1.api_response)(err, 401);
        }
    }
    async sendPasswordResetEmail(email) {
        try {
            logger_1.logger.info('====sendPasswordResetEmail Request initiated====');
            const user = await this.firebaseApp.getAuth().getUserByEmail(email);
            if (user) {
                const sendRsendEmail = await this.firebaseApp
                    .getAuth()
                    .generatePasswordResetLink(email);
                if (sendRsendEmail) {
                    logger_1.logger.info('Reset Email sent successfully');
                    return (0, response_1.api_response)(sendRsendEmail, 200, 'Reset Email sent successfully');
                }
            }
            else {
                logger_1.logger.error('User with email not found');
                return (0, response_1.api_response)([], 404, 'User with email not found');
            }
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 404);
        }
    }
    async resetPassword(email, newPassword) {
        try {
            logger_1.logger.info('====resetPassword Request initiated====');
            const getUser = await this.firebaseApp.getAuth().getUserByEmail(email);
            if (getUser) {
                const resetPassword = await this.firebaseApp
                    .getAuth()
                    .updateUser(getUser.uid, {
                    password: newPassword,
                });
                if (resetPassword) {
                    logger_1.logger.info('Password Reset successfully');
                    return (0, response_1.api_response)([], 200, 'Password Reset successfully');
                }
            }
            else {
                logger_1.logger.error('User not found');
                return (0, response_1.api_response)([], 404, 'User not found');
            }
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 404);
        }
    }
    async getRoles() {
        try {
            logger_1.logger.info('====getRoles Request initiated====');
            const getAllRoles = await this.firebaseApp
                .firestore()
                .collection('roles');
            const roles = [];
            await getAllRoles.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    roles.push({ id: doc.id, name: data.role });
                });
            });
            logger_1.logger.info('Fetched roles successfully');
            return (0, response_1.api_response)(roles, 200);
        }
        catch (error) {
            logger_1.logger.error(error);
            return (0, response_1.api_response)(error, 404);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_app_1.FirebaseApp,
        google_cloud_storage_service_1.UploadService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map