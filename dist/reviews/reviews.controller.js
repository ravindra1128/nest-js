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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const swagger_1 = require("@nestjs/swagger");
const review_dto_1 = require("../database/dto/review.dto");
let ReviewsController = class ReviewsController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async createReview(eventId, req) {
        const result = await this.reviewService.createReview(eventId, req.user, req.body);
        return result;
    }
    async getReviews(eventId, req) {
        const result = await this.reviewService.getReviews(eventId);
        return result;
    }
};
__decorate([
    (0, common_1.Post)('/create/:eventId'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: review_dto_1.CreateReviewDTo,
    }),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, common_1.Get)('/:eventId'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviews", null);
ReviewsController = __decorate([
    (0, common_1.Controller)('/auth/review'),
    (0, swagger_1.ApiTags)('Reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
exports.ReviewsController = ReviewsController;
//# sourceMappingURL=reviews.controller.js.map