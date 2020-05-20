import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  @Render('welcome')
  show() {
    return {title: 'Savelite'};
  }

  @Get('ping')
  ping() {
    return 'Awake';
  }

}
