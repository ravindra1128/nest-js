import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDTo {
  @ApiProperty({
    example: 'Rashad',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  owner: string;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: 'I Liked this event',
  })
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  event_id: string;
}
