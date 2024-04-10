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
exports.ReelsController = void 0;
const common_1 = require("@nestjs/common");
const reels_service_1 = require("./reels.service");
const swagger_1 = require("@nestjs/swagger");
const review_dto_1 = require("../database/dto/review.dto");
const platform_express_1 = require("@nestjs/platform-express");
let ReelsController = class ReelsController {
    constructor(reelsService) {
        this.reelsService = reelsService;
    }
    async createReview(itemId, req) {
        const result = await this.reelsService.createReel(itemId, req.user, req.body);
        return result;
    }
    async getReviews(page, pageSize, req) {
        const result = await this.reelsService.getReels(page, pageSize);
        return result;
    }
};
__decorate([
    (0, common_1.Post)('create/:itemId'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: review_dto_1.CreateReviewDTo,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReelsController.prototype, "createReview", null);
__decorate([
    (0, common_1.Get)('/:page/:pageSize'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('pageSize')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ReelsController.prototype, "getReviews", null);
ReelsController = __decorate([
    (0, common_1.Controller)('/auth/reel/'),
    (0, swagger_1.ApiTags)('Reels'),
    __metadata("design:paramtypes", [reels_service_1.ReelsService])
], ReelsController);
exports.ReelsController = ReelsController;
//# sourceMappingURL=reels.controller.js.map