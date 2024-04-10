import { Controller, Get, Post, Param, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDTo } from '../database/dto/comment.dto';
import { CommentsService } from './comments.service';

@Controller('/auth')
@ApiTags('Comment')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post('/comment/create')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: CreateCommentDTo,
  })
  async createComment(@Request() req) {
    const result = await this.commentService.createComments(req.user, req.body);
    return result;
  }

  @Get('/comment/')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async getComments(@Request() req) {
    const result = await this.commentService.getComments();
    return result;
  }

  @Get('/like/:itemId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async createLikes(@Param('itemId') itemId: string, @Request() req) {
    const result = await this.commentService.createComments(itemId, req.body);
    return result;
  }

  @Get('/save/:itemId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async saveItem(@Param('itemId') itemId: string, @Request() req) {
    const result = await this.commentService.saveItem(itemId, req.body);
    return result;
  }
}
