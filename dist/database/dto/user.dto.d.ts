export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: any;
    updatedAt: any;
}
export declare class ValidateTokenDto {
    token: string;
}
export declare class ForgotPasswordDTO {
    email: string;
}
export declare class ResetPasswordDTO {
    email: string;
    newPassword: string;
}
export declare class LoginDTO {
    email: string;
    password: string;
}
export declare class UpdateUserDto {
    selected_useage?: Array<string>;
    selected_range?: number;
}
export declare class UserProfileDto {
    userId: string;
    email: string;
    name: string;
    profile_images: Array<string>;
    search_range: any;
    selected_useage: any;
    profile_qrcode: any;
}
