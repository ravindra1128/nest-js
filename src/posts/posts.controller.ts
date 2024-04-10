import { Controller, Get, Post, Param, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDTO } from '../database/dto/post.dto';

@Controller('/auth/post')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @Post('/create/:itemId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: CreatePostDTO,
  })
  @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('file'))
  async createReview(@Param('itemId') itemId: string, @Request() req) {
    console.log(req.body);
    const result = await this.postService.createPost(
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
    const result = await this.postService.getPost(
      req.params.page,
      req.params.pageSize,
    );
    return result;
  }
}
