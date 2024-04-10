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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comment_dto_1 = require("../database/dto/comment.dto");
const comments_service_1 = require("./comments.service");
let CommentsController = class CommentsController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async createComment(req) {
        const result = await this.commentService.createComments(req.user, req.body);
        return result;
    }
    async getComments(req) {
        const result = await this.commentService.getComments();
        return result;
    }
    async createLikes(itemId, req) {
        const result = await this.commentService.createComments(itemId, req.body);
        return result;
    }
    async saveItem(itemId, req) {
        const result = await this.commentService.saveItem(itemId, req.body);
        return result;
    }
};
__decorate([
    (0, common_1.Post)('/comment/create'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: comment_dto_1.CreateCommentDTo,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)('/comment/'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getComments", null);
__decorate([
    (0, common_1.Get)('/like/:itemId'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "createLikes", null);
__decorate([
    (0, common_1.Get)('/save/:itemId'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "saveItem", null);
CommentsController = __decorate([
    (0, common_1.Controller)('/auth'),
    (0, swagger_1.ApiTags)('Comment'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map