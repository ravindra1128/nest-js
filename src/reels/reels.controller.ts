import {
  Controller,
  Get,
  Post,
  Param,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ReelsService } from './reels.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReviewDTo } from '../database/dto/review.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/auth/reel/')
@ApiTags('Reels')
export class ReelsController {
  constructor(private readonly reelsService: ReelsService) {}

  @Post('create/:itemId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: CreateReviewDTo,
  })
  @UseInterceptors(FileInterceptor('file'))
  async createReview(@Param('itemId') itemId: string, @Request() req) {
    const result = await this.reelsService.createReel(
      itemId,
      req.user,
      req.body,
    );
    return result;
  }

  @Get('/:page/:pageSize')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async getReviews(
    @Param('page') page: string,
    @Param('pageSize') pageSize: string,
    @Request() req,
  ) {
    const result = await this.reelsService.getReels(page, pageSize);
    return result;
  }
}
