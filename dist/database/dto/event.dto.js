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
exports.SendInviteDTO = exports.ShareItemDTO = exports.SaveItemDTO = exports.CreateEventTicketDTO = exports.UpdateEventDTO = exports.CreateEventDTo = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateEventDTo {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test Event',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDTo.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEventDTo.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], CreateEventDTo.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateEventDTo.prototype, "max_tickets", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateEventDTo.prototype, "ticket_ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEventDTo.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDTo.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDTo.prototype, "badge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateEventDTo.prototype, "start_datetime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateEventDTo.prototype, "end_datetime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateEventDTo.prototype, "schdeuled_release_date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateEventDTo.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateEventDTo.prototype, "updatedAt", void 0);
exports.CreateEventDTo = CreateEventDTo;
class UpdateEventDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test Event',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEventDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateEventDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateEventDTO.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateEventDTO.prototype, "badge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100.56,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateEventDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateEventDTO.prototype, "max_tickets", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], UpdateEventDTO.prototype, "ticket_ids", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateEventDTO.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], UpdateEventDTO.prototype, "start_datetime", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], UpdateEventDTO.prototype, "end_datetime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UpdateEventDTO.prototype, "schdeuled_release_date", void 0);
exports.UpdateEventDTO = UpdateEventDTO;
class CreateEventTicketDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateEventTicketDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateEventTicketDTO.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'jf709hnn',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventTicketDTO.prototype, "event_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventTicketDTO.prototype, "event_name", void 0);
exports.CreateEventTicketDTO = CreateEventTicketDTO;
class SaveItemDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'Pass event/post/feed/reel id according to item_type of save',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveItemDTO.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'event',
        description: 'Pass event/post/feed/reel type',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveItemDTO.prototype, "item_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'jf709hnn',
        description: 'Id of person who is saving the item',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SaveItemDTO.prototype, "who_saved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SaveItemDTO.prototype, "timestamp", void 0);
exports.SaveItemDTO = SaveItemDTO;
class ShareItemDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'Pass event/post/feed/reel id according to item_type of save',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ShareItemDTO.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'event',
        description: 'Pass event/post/feed/reel type',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ShareItemDTO.prototype, "item_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'destination',
        description: 'Pass the destination string here',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShareItemDTO.prototype, "shared_to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'sdfgg',
        description: 'Pass the user id here',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShareItemDTO.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShareItemDTO.prototype, "timestamp", void 0);
exports.ShareItemDTO = ShareItemDTO;
class SendInviteDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john@gmail.com',
        description: 'To email',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SendInviteDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'message',
    }),
    __metadata("design:type", String)
], SendInviteDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'event_id',
    }),
    __metadata("design:type", String)
], SendInviteDTO.prototype, "eventId", void 0);
exports.SendInviteDTO = SendInviteDTO;
//# sourceMappingURL=event.dto.js.map