import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
