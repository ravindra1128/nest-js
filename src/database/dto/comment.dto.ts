import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTo {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  item_type: number;

  @ApiProperty({
    example: 'I Liked this event',
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
  user_id: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  user_image: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  timestamp: Date;
}
