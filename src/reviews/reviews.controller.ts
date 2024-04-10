import { Controller, Get, Post, Param, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReviewDTo } from '../database/dto/review.dto';

@Controller('/auth/review')
@ApiTags('Reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('/create/:eventId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: CreateReviewDTo,
  })
  async createReview(@Param('eventId') eventId: string, @Request() req) {
    const result = await this.reviewService.createReview(
      eventId,
      req.user,
      req.body,
    );
    return result;
  }

  @Get('/:eventId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async getReviews(@Param('eventId') eventId: string, @Request() req) {
    const result = await this.reviewService.getReviews(eventId);
    return result;
  }
}
