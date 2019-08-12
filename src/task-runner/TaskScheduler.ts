/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {TaskRunner} from './TaskRunner';
import {spawn} from 'child_process';

export class TaskScheduler extends TaskRunner {

    async addPipeline(pipeline: any = null) {
        const { _id: pipelineId } = pipeline;
        const pipelineTasks = await this.pipelineTasksService.find({pipelineId});
        const tasks = pipelineTasks.map( e => {
            // @ts-ignore
            const {_id, name, averageTime} = e.task;
            return {_id, name, averageTime};
        });
        // tslint:disable-next-line:no-console
        // console.log(tasks);
        this.pipelines.push({
            pipeline,
            time: 0,
            tasks,
        });

        // tslint:disable-next-line:no-console
        // console.log(this.pipelines);

        if (this.busy) {
            this.sendStatus('Pipeline scheduled');
        } else {
            this.nextTask();
        }
    }

    startTask(task: any) {
        this.busy = true;
        // tslint:disable-next-line:no-console
        console.log(`startTask ${task.name}`);
        this.sendStatus(`Start Task ${task.name}`);
    }

    endTask(task: any, data: any = null) {
        this.busy = false;
        // tslint:disable-next-line:no-console
        console.log(`endTask ${task.name}`);

        if (this.pipelines.length > 0) {
            // seconds
            this.pipelines[0].time += data.time.duration / 1000;

            if (this.pipelines[0].tasks.length > 0) {
                this.pipelines[0].tasks.splice(0, 1);
            }

            if (this.pipelines[0].tasks.length === 0) {
                const {pipeline} = this.pipelines[0];
                pipeline.runTime = this.pipelines[0].time;
                this.savePipelineRunTime(pipeline);
                this.pipelines.splice(0, 1);
            }
        }

        this.nextTask();
        this.sendStatus(`End Task ${task.name}`);
    }

    async nextTask() {
        if (this.pipelines.length > 0) {
            if (this.pipelines[0].tasks.length > 0) {
                const task = this.pipelines[0].tasks[0];
                await this.runTask(task);
            }
        } else {
            // tslint:disable-next-line:no-console
            console.log('pipelines queue empty');
            this.sendStatus('Pipelines Queue is Empty');
        }
    }

    runTask(task: any): Promise<any> {
        if (this.busy) {
            return Promise.reject();
        }
        const out: any = {
            data: null,
            code: 0,
            time: {
                start: Date.now(),
                end: null,
                duration: 0,
            },
        };

        return new Promise((resolve, reject) => {

            const delta = (task.averageTime / 5) * Math.sign(Math.random() - 0.5);
            const time = task.averageTime + delta;
            const ls = spawn('./sleep.sh', [`${task.name}`, `${task._id}`, `${time}s`]);
            this.startTask(task);

            ls.stdout.on('data', (data) => {
                // tslint:disable-next-line:no-console
                console.log(`stdout: ${data}`);
                out.data = data;
            });

            ls.stderr.on('data', (data) => {
                // tslint:disable-next-line:no-console
                console.log(`stderr: ${data}`);
                out.time.end = new Date();
                this.endTask(task);
                reject(data);
            });

            ls.on('close', (code) => {
                // tslint:disable-next-line:no-console
                console.log(`child process exited with code ${code}`);
                out.code = code;
                out.time.end = Date.now();
                if (out.time.end !== null) {
                    out.time.duration = out.time.end - out.time.start;
                }
                this.endTask(task, out);
                resolve(out);
            });
        });
    }

}
