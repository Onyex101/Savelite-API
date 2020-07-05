import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
/**
 * starting point for entire application
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost', 'https://savelite-api.herokuapp.com'],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('hbs');

  const options = new DocumentBuilder()
    .setTitle('Savelite')
    .setDescription('Savelite API documentation')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    customfavIcon: '../favicon.ico',
  });
  await app.listen(process.env.PORT || 3000, () => {
    // tslint:disable-next-line: no-console
    // console.log(`app started at port ${process.env.PORT}`);
  });

}
bootstrap();
