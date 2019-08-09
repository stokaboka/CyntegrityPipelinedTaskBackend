/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { PipelinesSchema } from './pipelines.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Pipelines', schema: PipelinesSchema },
    ]),
  ],
  providers: [PipelinesService],
  controllers: [PipelinesController]
})
export class PipelinesModule {}
