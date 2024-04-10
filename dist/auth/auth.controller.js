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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../database/dto/user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async create(createUserDto) {
        const result = await this.authService.create(createUserDto);
        return result;
    }
    async verifyToken(data) {
        const result = await this.authService.verifyToken(data['token']);
        return result;
    }
    async ForgotPassword(data) {
        const result = await this.authService.sendPasswordResetEmail(data['email']);
        return result;
    }
    async ResetPassword(data) {
        const result = await this.authService.resetPassword(data['email'], data['newPassword']);
        return result;
    }
    async loginUser(data) {
        const result = await this.authService.loginUser(data.email, data.password);
        return result;
    }
    async getAllRoles(req) {
        const result = await this.authService.getRoles();
        return result;
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User registerd successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.CreateUserDto,
        description: 'Json structure for user object',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/verify-token'),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.ValidateTokenDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ValidateTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.ForgotPasswordDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ForgotPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "ForgotPassword", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.ResetPasswordDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password Reset successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User not found',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "ResetPassword", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.LoginDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('/roles'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllRoles", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map