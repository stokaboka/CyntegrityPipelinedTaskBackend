/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { PipesModule } from './pipelines/pipes.module';
import { PipelineTasksModule } from './pipeline-tasks/pipeline-tasks.module';
import { ConfigModule } from './config/config.module';
import { ConfigService} from "./config/config.service";

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/cpt'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    TasksModule,
    UsersModule,
    PipesModule,
    PipelineTasksModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
