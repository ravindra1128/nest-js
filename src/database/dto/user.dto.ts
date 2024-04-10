import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'testuser@gmal.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'user , promoter',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: any;

  @IsNotEmpty()
  @IsDate()
  updatedAt: any;
}

export class ValidateTokenDto {
  @ApiProperty({
    example: '***************',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class ForgotPasswordDTO {
  @ApiProperty({
    example: 'testuser@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class ResetPasswordDTO {
  @ApiProperty({
    example: 'testuser@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'test@123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class LoginDTO {
  @ApiProperty({
    example: 'testuser@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'test@123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  // @ApiProperty({
  //   example: "John doe",
  //   required: true
  // })
  // @Optional()
  // @IsString()
  // name?: string;

  @ApiProperty({
    example: [
      'Entertainment an fun',
      'Socializing and networking',
      'Discovering new experiences',
      'Hobbies and interest',
    ],
    required: true,
  })
  @Optional()
  @IsString()
  selected_useage?: Array<string>;

  @ApiProperty({
    example: 20,
    required: true,
  })
  @Optional()
  @IsString()
  selected_range?: number;
}

export class UserProfileDto {
  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User display name' })
  name: string;

  @ApiProperty({ description: 'URL to user profile photo' })
  profile_images: Array<string>;

  @ApiProperty({ description: 'How many miles out you want to see ?' })
  search_range: any;

  @ApiProperty({ description: 'What they plan to use the app for?' })
  selected_useage: any;

  @ApiProperty({ description: 'Profile Qr code' })
  profile_qrcode: any;
}
