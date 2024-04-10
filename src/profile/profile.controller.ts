import {
  Controller,
  Get,
  Post,
  Patch,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../database/dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/auth')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/profile')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async getUserProfile(@Request() req) {
    const result = await this.profileService.getUserProfile(req.user);
    return result;
  }

  @Patch('/update-user')
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Protected Route' })
  async updateUser(@Request() req) {
    const result = await this.profileService.updateUserProfile(
      req.user,
      req.body,
    );
    return result;
  }

  @Post('/update-profile-image')
  @ApiBearerAuth('accessToken')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Protected Route' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateProfilePic(@Request() req) {
    const result = await this.profileService.uploadFile(req.user, req.file);
    return result;
  }
}
