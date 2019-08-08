import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipeTasksService } from './pipe-tasks.service';
import { PipeTasksController } from './pipe-tasks.controller';
import { PipeTasksSchema } from './pipeTasks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PipeTasks', schema: PipeTasksSchema },
    ]),
  ],
  providers: [PipeTasksService],
  controllers: [PipeTasksController]
})
export class PipeTasksModule {}
