import { Controller, Get, Post, Param, Request, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventDTo, CreateEventTicketDTO, SaveItemDTO, SendInviteDTO, ShareItemDTO, UpdateEventDTO } from '../database/dto/event.dto';

@Controller('/auth')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('/categories')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async getCategories(@Request() req) {
    const result = await this.eventService.getCategories();
    return result;
  }

  @Get('/badges')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async getBadges(@Request() req) {
    const result = await this.eventService.getBadges();
    return result;
  }

  @Post('/event/create')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: CreateEventDTo,
  })
  async createEvent(@Request() req) {
    const result = await this.eventService.createEvent(req.user, req.body);
    return result;
  }

  @Put('/event/update/:eventId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: UpdateEventDTO,
  })
  async updateEventController(
    @Param('eventId') eventId: string,
    @Request() req,
  ) {
    const result = await this.eventService.updateEvent(
      eventId,
      req.user,
      req.body,
    );
    return result;
  }

  @Get('/event/:eventId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  async getSingleEvent(@Param('eventId') eventId: string, @Request() req) {
    const result = await this.eventService.getSingleEvent(eventId);
    return result;
  }

  @Post('/event/ticket/create')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: CreateEventTicketDTO,
  })
  async createEventTicketController(@Request() req) {
    const result = await this.eventService.createEventTicket(
      req.user,
      req.body,
    );
    return result;
  }

  @Post('/save/:itemId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: SaveItemDTO,
  })
  async saveEvent(@Param('itemId') itemId: string, @Request() req) {
    const result = await this.eventService.saveItem(itemId, req.body);
    return result;
  }

  @Post('/share/:itemId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: ShareItemDTO,
  })
  async shareEvent(@Param('itemId') itemId: string, @Request() req) {
    const result = await this.eventService.shareItem(itemId, req.body);
    return result;
  }

  @Post('/invite')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: SendInviteDTO,
  })
  async sendEventInvite(@Param('eventId') eventId: string, @Request() req) {
    const result = await this.eventService.sendEventInvite(eventId, req.body);
    return result;
  }

  @Post('/contact-us')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Protected Route' })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    type: SendInviteDTO,
  })
  async contact(@Param('itemId') itemId: string, @Request() req) {
    const result = await this.eventService.contactUs(req.email, req.body.message);
    return result;
  }
}
