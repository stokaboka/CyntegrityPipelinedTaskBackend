/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {RedisIoAdapter} from "./adapters/RedisIoAdapter";

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );

  app.useWebSocketAdapter(new RedisIoAdapter(app));

  const apiVersionNumber = app.get('ConfigService').apiVersion;
  app.setGlobalPrefix(`api/v${apiVersionNumber}`);

  const publicPath = app.get('ConfigService').publicPath;
  // tslint:disable-next-line:no-console
  console.log('publicPath', publicPath);
  app.useStaticAssets(publicPath);

  app.enableCors({
    credentials: true,
    origin: true,
    // allowedHeaders: 'Content-Type,Authorization,Accept',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const port = app.get('ConfigService').port || 3000;
  const host = app.get('ConfigService').host || '0.0.0.0';

  try {
    await app.listen(port, host);
    // tslint:disable-next-line:no-console
    console.log('Server started:', `${host}:${port}`);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Server failed:', e.message);
  }
}
bootstrap();
