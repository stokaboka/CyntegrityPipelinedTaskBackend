/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {TaskRunnerGateway} from './task-runner.gateway';
import {PipelinesDto} from '../pipelines/pipelines.dto';
import {TasksService} from '../tasks/tasks.service';
import {PipelinesService} from '../pipelines/pipelines.service';
import {PipelineTasksService} from '../pipeline-tasks/pipeline-tasks.service';
import {TasksDto} from '../tasks/tasks.dto';

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

    getStatus(message: string, updated: any = null): any {
        const {busy, pipelines} = this;
        const out = {
            busy,
            message,
            active: {
                pipeline: pipelines.length > 0 ? pipelines[0].pipeline._id : null,
                task: pipelines.length > 0 && pipelines[0].tasks.length > 0 ?  pipelines[0].tasks[0]._id : null,
            },
            scheduled: pipelines.length > 1 ? pipelines.filter((e, i) => i > 0).map(e => e.pipeline._id) : null,
            updated,
        };
        return out;
    }

    sendStatus(message: string, data: any = null) {
        const status = this.getStatus(message, data);
        // tslint:disable-next-line:no-console
        console.log('sendStatus', message);
        this.gateway.emit('task-runner-status', status);
    }

    async savePipeline(pipeline: PipelinesDto) {
        // tslint:disable-next-line:no-console
        // console.log(`savePipelineRunTime ${pipelineInfo.pipeline.name} ${pipelineInfo.status} ${pipelineInfo.runTime}`);
        await this.pipelinesService.save(pipeline);
        this.sendStatus('Pipeline updated', pipeline);
    }

    async saveTask(message: string, task: TasksDto) {
        // tslint:disable-next-line:no-console
        // console.log(`saveTask ${task.name}`);
        await this.tasksService.save(task);
        this.sendStatus(message, task);
    }

}
