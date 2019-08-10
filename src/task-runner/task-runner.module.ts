import { Module } from '@nestjs/common';
import { TaskRunnerGateway } from "./task-runner.gateway";

@Module({
    providers: [TaskRunnerGateway]
})
export class TaskRunnerModule {}
