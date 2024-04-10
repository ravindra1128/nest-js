import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReelDTO {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  images: Array<String>;

  @ApiProperty({
    example: 'Sample reel text',
  })
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  like_count: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  comment_count: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  save_count: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  music_track: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  share_count: Date;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  timestamp: Date;
}
