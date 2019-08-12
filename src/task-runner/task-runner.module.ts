import { Module } from '@nestjs/common';
import { TaskRunnerGateway } from './task-runner.gateway';
import { TaskRunnerService } from './task-runner.service';
import {PipelinesModule} from '../pipelines/pipelines.module';
import {PipelineTasksModule} from '../pipeline-tasks/pipeline-tasks.module';
import {TasksModule} from '../tasks/tasks.module';

@Module({
    imports: [PipelinesModule, PipelineTasksModule, TasksModule],
    providers: [TaskRunnerGateway, TaskRunnerService],
    exports: [TaskRunnerService],
})
export class TaskRunnerModule {}
