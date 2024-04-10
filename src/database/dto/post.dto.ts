import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDTO {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    required: true,
  })
  @ApiProperty({ type: 'file', format: 'binary', required: true })
  image: Express.Multer.File;

  @ApiProperty({
    required: false,
    example: 'Sample reel text',
  })
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    required: false,
    type: 'number',
  })
  @IsNotEmpty()
  like_count: number;

  @ApiProperty({
    required: false,
    type: 'number',
  })
  @IsNotEmpty()
  comment_count: number;

  @ApiProperty({
    required: false,
    type: 'number',
  })
  @IsNotEmpty()
  save_count: number;

  @ApiProperty({
    required: false,
    type: 'number',
  })
  @IsNotEmpty()
  share_count: Date;

  @ApiProperty({
    required: true,
    format: 'date-time',
  })
  @IsNotEmpty()
  timestamp: Date;
}
