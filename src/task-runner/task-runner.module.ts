import { Module } from '@nestjs/common';
import { TaskRunnerGateway } from "./task-runner.gateway";
import { TaskRunnerService } from './task-runner.service';

@Module({
    providers: [TaskRunnerGateway, TaskRunnerService],
    exports: [TaskRunnerService]
})
export class TaskRunnerModule {}
