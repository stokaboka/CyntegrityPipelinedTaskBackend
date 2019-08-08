import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersSchema } from './schemas/users.schema';
import { TasksSchema } from './schemas/tasks.schema';
import { PipesSchema } from './schemas/pipes.schema';
import { PipeTasksSchema } from './schemas/pipeTasks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Tasks', schema: TasksSchema },
      { name: 'Pipes', schema: PipesSchema },
      { name: 'PipeTasks', schema: PipeTasksSchema },
    ]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
