import { AuthService } from './auth.service';
import { CreateUserDto, ForgotPasswordDTO, LoginDTO, ResetPasswordDTO, ValidateTokenDto } from '../database/dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    verifyToken(data: ValidateTokenDto): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    ForgotPassword(data: ForgotPasswordDTO): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    ResetPassword(data: ResetPasswordDTO): Promise<any>;
    loginUser(data: LoginDTO): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    getAllRoles(req: any): Promise<any>;
}
