import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(@Req() request: Request): string {
    console.log(request);
    return 'YOU ARE NOT SUPPOSE TO BE HERE!! LEAVE AT ONCE';
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
