/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PipelineTasksService} from "./pipeline-tasks.service";
import {PipelineTasks} from "./pipeline-tasks.interface";
import {PipelineTasksDto} from "./pipeline-tasks.dto";

@Controller('pipeline-tasks')
export class PipelineTasksController {
    constructor(private readonly pipeTasksService: PipelineTasksService){}

    @Get()
    find(@Param() params): Promise<PipelineTasks[]>{
        return this.pipeTasksService.find();
    }

    @Post()
    create(@Body() pipeTask: PipelineTasksDto): Promise<PipelineTasks>{
        return this.pipeTasksService.create(pipeTask);
    }
}
