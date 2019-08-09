/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PipelineTasksService} from "./pipeline-tasks.service";
import {PipeTasks} from "./pipeline-tasks.interface";
import {PipelineTasksDto} from "./pipeline-tasks.dto";

@Controller('pipe-tasks')
export class PipelineTasksController {
    constructor(private readonly pipeTasksService: PipelineTasksService){}

    @Get()
    find(@Param() params): Promise<PipeTasks[]>{
        return this.pipeTasksService.find();
    }

    @Post()
    create(@Body() pipeTask: PipelineTasksDto): Promise<PipeTasks>{
        return this.pipeTasksService.create(pipeTask);
    }
}
