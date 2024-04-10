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
exports.FeedsController = void 0;
const common_1 = require("@nestjs/common");
const feeds_service_1 = require("./feeds.service");
const swagger_1 = require("@nestjs/swagger");
const post_dto_1 = require("../database/dto/post.dto");
const platform_express_1 = require("@nestjs/platform-express");
let FeedsController = class FeedsController {
    constructor(feedsService) {
        this.feedsService = feedsService;
    }
    async createFeed(req) {
        const result = await this.feedsService.createFeed(req.user, req.body);
        return result;
    }
    async getFeeds(req) {
        const result = await this.feedsService.getFeeds(req.params.page, req.params.pageSize);
        return result;
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: post_dto_1.CreatePostDTO,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedsController.prototype, "createFeed", null);
__decorate([
    (0, common_1.Get)('/:page/:pageSize'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedsController.prototype, "getFeeds", null);
FeedsController = __decorate([
    (0, common_1.Controller)('/auth/feed'),
    (0, swagger_1.ApiTags)('Feed'),
    __metadata("design:paramtypes", [feeds_service_1.FeedsService])
], FeedsController);
exports.FeedsController = FeedsController;
//# sourceMappingURL=feeds.controller.js.map