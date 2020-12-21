// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis.adapter';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'resource'));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);

  // WORKING ON RUNNING MULTIPLE INSTANCES (Having CORS issues)
  // OTHERWISE DUPLICATE SOURCE CODES AND RUN IN DIFFERENT PORTS
  // ///////////////////////////////////////////////////////////////////////////////
  // const server = express();
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.enableCors();
  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  // app.useStaticAssets(join(__dirname, '..', 'resource'));
  // await app.init();

  // const httpsOptions = {
  //   key: fs.readFileSync('./secrets/private-key.pem'),
  //   cert: fs.readFileSync('./secrets/public-certificate.pem'),
  // };

  // http.createServer(server).listen(3004);
  // http.createServer(server).listen(3005);

  // https.createServer(httpsOptions, server).listen(443);
}

bootstrap();