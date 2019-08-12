/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {TaskRunnerGateway} from './task-runner.gateway';
import {PipelinesDto} from '../pipelines/pipelines.dto';
import {TasksService} from '../tasks/tasks.service';
import {PipelinesService} from '../pipelines/pipelines.service';
import {PipelineTasksService} from '../pipeline-tasks/pipeline-tasks.service';

export class TaskRunner {
    protected pipelines: any[] = [];
    protected busy: boolean = false;

    protected gateway: TaskRunnerGateway;
    protected tasksService: TasksService;
    protected pipelinesService: PipelinesService;
    protected pipelineTasksService: PipelineTasksService;

    setGateway(gateway: TaskRunnerGateway) {
        this.gateway = gateway;
    }
    setTasksService(tasksService: TasksService) {
        this.tasksService = tasksService;
    }
    setPipelinesService(pipelinesService: PipelinesService) {
        this.pipelinesService = pipelinesService;
    }
    setPipelineTasksService(pipelineTasksService: PipelineTasksService) {
        this.pipelineTasksService = pipelineTasksService;
    }

    getStatus(message: string, pipeline: PipelinesDto = null): any {
        const {busy, pipelines} = this;
        const out = {
            busy,
            message,
            active: {
                pipeline: pipelines.length > 0 ? pipelines[0].pipeline._id : null,
                task: pipelines.length > 0 && pipelines[0].tasks.length > 0 ?  pipelines[0].tasks[0]._id : null,
            },
            scheduled: pipelines.length > 1 ? pipelines.filter((e, i) => i > 0).map(e => e.pipeline._id) : null,
            updated: pipeline,
        };
        return out;
    }

    sendStatus(message: string, pipeline: PipelinesDto = null) {
        const status = this.getStatus(message, pipeline);
        // tslint:disable-next-line:no-console
        console.log('sendStatus');
        this.gateway.emit('task-runner-status', status);
    }

    async savePipelineRunTime(pipeline: PipelinesDto) {
        // tslint:disable-next-line:no-console
        console.log(`savePipelineRunTime ${pipeline.name} ${pipeline.runTime}`);
        await this.pipelinesService.save(pipeline);
        this.sendStatus('Pipeline updated', pipeline);
    }
}
