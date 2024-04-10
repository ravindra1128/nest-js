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
exports.UserProfileDto = exports.UpdateUserDto = exports.LoginDTO = exports.ResetPasswordDTO = exports.ForgotPasswordDTO = exports.ValidateTokenDto = exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'testuser@gmal.com',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user , promoter',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "updatedAt", void 0);
exports.CreateUserDto = CreateUserDto;
class ValidateTokenDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '***************',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidateTokenDto.prototype, "token", void 0);
exports.ValidateTokenDto = ValidateTokenDto;
class ForgotPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'testuser@gmail.com',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ForgotPasswordDTO.prototype, "email", void 0);
exports.ForgotPasswordDTO = ForgotPasswordDTO;
class ResetPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'testuser@gmail.com',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@123',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "newPassword", void 0);
exports.ResetPasswordDTO = ResetPasswordDTO;
class LoginDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'testuser@gmail.com',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@123',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
exports.LoginDTO = LoginDTO;
class UpdateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            'Entertainment an fun',
            'Socializing and networking',
            'Discovering new experiences',
            'Hobbies and interest',
        ],
        required: true,
    }),
    (0, common_1.Optional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "selected_useage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        required: true,
    }),
    (0, common_1.Optional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "selected_range", void 0);
exports.UpdateUserDto = UpdateUserDto;
class UserProfileDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User email' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User display name' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL to user profile photo' }),
    __metadata("design:type", Array)
], UserProfileDto.prototype, "profile_images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'How many miles out you want to see ?' }),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "search_range", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'What they plan to use the app for?' }),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "selected_useage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Profile Qr code' }),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "profile_qrcode", void 0);
exports.UserProfileDto = UserProfileDto;
//# sourceMappingURL=user.dto.js.map