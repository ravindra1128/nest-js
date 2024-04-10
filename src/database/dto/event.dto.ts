import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTo {
  @ApiProperty({
    example: 'Test Event',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  description: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  price: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  max_tickets: number;

  @IsNotEmpty()
  ticket_ids: Array<string>;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  category: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  badge: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  start_datetime: Date;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  end_datetime: Date;

  @ApiProperty({})
  @IsNotEmpty()
  @IsDate()
  schdeuled_release_date: Date;

  promotional_images: Array<string>;

  featured: null;

  schedule_release_date: null;

  attendants: Array<string>;

  share_count: number;
  like_count: number;
  save_count: number;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}

export class UpdateEventDTO {
  @ApiProperty({
    example: 'Test Event',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  @IsEmail()
  description: string;

  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  badge: string;

  @ApiProperty({
    example: 100.56,
  })
  @IsNotEmpty()
  price: Number;

  @ApiProperty({
    example: 100,
  })
  @IsNotEmpty()
  max_tickets: number;

  @IsNotEmpty()
  ticket_ids: Array<string>;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  start_datetime: Date;

  @IsNotEmpty()
  end_datetime: Date;

  @ApiProperty({})
  @IsNotEmpty()
  @IsDate()
  schdeuled_release_date: Date;

  promotional_images: Array<string>;

  featured: null;

  schedule_release_date: null;

  attendants: Array<string>;

  share_count: number;
  like_count: number;
  save_count: number;
}

export class CreateEventTicketDTO {
  @ApiProperty({
    example: 100,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 3,
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: 'jf709hnn',
  })
  @IsNotEmpty()
  @IsString()
  event_id: string;

  // @ApiProperty({
  //   example: 'jf709hnn',
  // })
  // @IsNotEmpty()
  // @IsString()
  // qr_code: string;

  @ApiProperty({
    example: 'test',
  })
  @IsNotEmpty()
  @IsString()
  event_name: string;
}

export class SaveItemDTO {
  @ApiProperty({
    example: '',
    description: 'Pass event/post/feed/reel id according to item_type of save',
  })
  @IsNotEmpty()
  itemId: string;

  @ApiProperty({
    example: 'event',
    description: 'Pass event/post/feed/reel type',
  })
  @IsNotEmpty()
  item_type: string;

  @ApiProperty({
    example: 'jf709hnn',
    description: 'Id of person who is saving the item',
  })
  @IsNotEmpty()
  @IsString()
  who_saved: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  timestamp: string;
}

export class ShareItemDTO {
  @ApiProperty({
    example: '',
    description: 'Pass event/post/feed/reel id according to item_type of save',
  })
  @IsNotEmpty()
  itemId: string;

  @ApiProperty({
    example: 'event',
    description: 'Pass event/post/feed/reel type',
  })
  @IsNotEmpty()
  item_type: string;

  @ApiProperty({
    example: 'destination',
    description: 'Pass the destination string here',
  })
  @IsNotEmpty()
  @IsString()
  shared_to: string;

  @ApiProperty({
    example: 'sdfgg',
    description: 'Pass the user id here',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  timestamp: string;
}

export class SendInviteDTO {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'To email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
    description: 'message',
  })
  message: string;

  @ApiProperty({
    required: false,
    description: 'event_id',
  })
  eventId: string;
}
