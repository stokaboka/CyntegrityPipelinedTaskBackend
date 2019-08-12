import { Injectable } from '@nestjs/common';
import {PipelinesService} from '../pipelines/pipelines.service';
import {PipelineTasksService} from '../pipeline-tasks/pipeline-tasks.service';
import {TaskRunnerGateway} from './task-runner.gateway';
import {TasksService} from '../tasks/tasks.service';
import {TaskScheduler} from './TaskScheduler';

@Injectable()
export class TaskRunnerService {

    taskScheduler: TaskScheduler;

    constructor(
        private readonly tasksService: TasksService,
        private readonly pipelinesService: PipelinesService,
        private readonly pipelineTasksService: PipelineTasksService,
        ) {

        this.taskScheduler = new TaskScheduler();
        this.taskScheduler.setTasksService(this.tasksService);
        this.taskScheduler.setPipelinesService(this.pipelinesService);
        this.taskScheduler.setPipelineTasksService(this.pipelineTasksService);
    }

    setGateway(gateway: TaskRunnerGateway) {
        this.taskScheduler.setGateway(gateway);
    }
    getStatus(message: string): any {
        this.taskScheduler.getStatus(message);
    }

    async addPipeline(pipeline: any = null) {
        await this.taskScheduler.addPipeline(pipeline);
    }

}
