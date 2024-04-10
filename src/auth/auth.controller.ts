import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, ForgotPasswordDTO, LoginDTO, ResetPasswordDTO, ValidateTokenDto } from '../database/dto/user.dto';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({ status: 201, description: 'User registerd successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.create(createUserDto);
    return result;
  }

  @Post('/verify-token')
  @ApiBody({
    type: ValidateTokenDto,
  })
  async verifyToken(@Body() data: ValidateTokenDto) {
    const result = await this.authService.verifyToken(data['token']);
    return result;
  }

  @Post('/forgot-password')
  @ApiBody({
    type: ForgotPasswordDTO,
  })
  async ForgotPassword(@Body() data: ForgotPasswordDTO) {
    const result = await this.authService.sendPasswordResetEmail(data['email']);
    return result;
  }

  @Post('/reset-password')
  @ApiBody({
    type: ResetPasswordDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Password Reset successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async ResetPassword(@Body() data: ResetPasswordDTO) {
    const result = await this.authService.resetPassword(
      data['email'],
      data['newPassword'],
    );
    return result;
  }

  @Post('/login')
  @ApiBody({
    type: LoginDTO,
  })
  async loginUser(@Body() data: LoginDTO) {
    const result = await this.authService.loginUser(data.email, data.password);
    return result;
  }

  @Get('/roles')
  async getAllRoles(@Req() req: any) {
    const result = await this.authService.getRoles();
    return result;
  }
}
