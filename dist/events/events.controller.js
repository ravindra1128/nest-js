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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const swagger_1 = require("@nestjs/swagger");
const event_dto_1 = require("../database/dto/event.dto");
let EventsController = class EventsController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async getCategories(req) {
        const result = await this.eventService.getCategories();
        return result;
    }
    async getBadges(req) {
        const result = await this.eventService.getBadges();
        return result;
    }
    async createEvent(req) {
        const result = await this.eventService.createEvent(req.user, req.body);
        return result;
    }
    async updateEventController(eventId, req) {
        const result = await this.eventService.updateEvent(eventId, req.user, req.body);
        return result;
    }
    async getSingleEvent(eventId, req) {
        const result = await this.eventService.getSingleEvent(eventId);
        return result;
    }
    async createEventTicketController(req) {
        const result = await this.eventService.createEventTicket(req.user, req.body);
        return result;
    }
    async saveEvent(itemId, req) {
        const result = await this.eventService.saveItem(itemId, req.body);
        return result;
    }
    async shareEvent(itemId, req) {
        const result = await this.eventService.shareItem(itemId, req.body);
        return result;
    }
    async sendEventInvite(eventId, req) {
        const result = await this.eventService.sendEventInvite(eventId, req.body);
        return result;
    }
    async contact(itemId, req) {
        const result = await this.eventService.contactUs(req.email, req.body.message);
        return result;
    }
};
__decorate([
    (0, common_1.Get)('/categories'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('/badges'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getBadges", null);
__decorate([
    (0, common_1.Post)('/event/create'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: event_dto_1.CreateEventDTo,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Put)('/event/update/:eventId'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: event_dto_1.UpdateEventDTO,
    }),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "updateEventController", null);
__decorate([
    (0, common_1.Get)('/event/:eventId'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getSingleEvent", null);
__decorate([
    (0, common_1.Post)('/event/ticket/create'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: event_dto_1.CreateEventTicketDTO,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEventTicketController", null);
__decorate([
    (0, common_1.Post)('/save/:itemId'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: event_dto_1.SaveItemDTO,
    }),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "saveEvent", null);
__decorate([
    (0, common_1.Post)('/share/:itemId'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: event_dto_1.ShareItemDTO,
    }),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "shareEvent", null);
__decorate([
    (0, common_1.Post)('/invite'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: event_dto_1.SendInviteDTO,
    }),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "sendEventInvite", null);
__decorate([
    (0, common_1.Post)('/contact-us'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiOperation)({ summary: 'Protected Route' }),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBody)({
        type: event_dto_1.SendInviteDTO,
    }),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "contact", null);
EventsController = __decorate([
    (0, common_1.Controller)('/auth'),
    (0, swagger_1.ApiTags)('Events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map