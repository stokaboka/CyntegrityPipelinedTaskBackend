import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksSchema } from './schemas/tasks.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Tasks', schema: TasksSchema },
    ]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
