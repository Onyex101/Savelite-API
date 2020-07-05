import { Controller, Get, Render } from '@nestjs/common';
import { configKeys } from './config/config';

@Controller()
export class AppController {

  @Get()
  @Render('welcome')
  show() {
    return {
      'version': configKeys.version,
      'download-link': configKeys.DOWNLOAD_LINK,
    };
  }

  @Get('ping')
  ping() {
    return 'Awake';
  }

}
