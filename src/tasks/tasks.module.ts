import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersSchema } from '../users/users.schema';
import { TasksSchema } from './schemas/tasks.schema';
import { PipeTasksSchema } from './schemas/pipeTasks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Tasks', schema: TasksSchema },
      { name: 'PipeTasks', schema: PipeTasksSchema },
    ]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
