import {
  Controller,
  Get,
  Post,
  Param,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDTO } from '../database/dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/auth/feed')
@ApiTags('Feed')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Post('/create')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: CreatePostDTO,
  })
  @UseInterceptors(FileInterceptor('file'))
  async createFeed(@Request() req) {
    const result = await this.feedsService.createFeed(req.user, req.body);
    return result;
  }

  @Get('/:page/:pageSize')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async getFeeds(@Request() req) {
    const result = await this.feedsService.getFeeds(
      req.params.page,
      req.params.pageSize,
    );
    return result;
  }
}
