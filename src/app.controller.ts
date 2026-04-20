import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  renderMail() {
    return this.appService.renderMail();
  }

  @Post(':email')
  sendMail(@Param('email') email: string) {
    return this.appService.sendTestMail(email);
  }
}
