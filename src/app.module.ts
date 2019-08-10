import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { PipelinesModule } from './pipelines/pipelines.module';
import { PipelineTasksModule } from './pipeline-tasks/pipeline-tasks.module';
import { ConfigModule } from './config/config.module';
import { ConfigService} from "./config/config.service";
import { TaskRunnerModule } from './task-runner/task-runner.module';
import { TaskRunnerGateway } from './task-runner/task-runner.gateway';
/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */


@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/cpt'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    TasksModule,
    UsersModule,
    PipelinesModule,
    PipelineTasksModule,
    ConfigModule,
    TaskRunnerModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskRunnerGateway],
})
export class AppModule {}
