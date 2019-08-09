/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PipelineTasksService} from "./pipeline-tasks.service";
import {PipelineTasks} from "./pipeline-tasks.interface";
import {PipelineTasksDto} from "./pipeline-tasks.dto";

@Controller('pipeline-tasks')
export class PipelineTasksController {
    constructor(private readonly pipelineTasksService: PipelineTasksService){}

    @Get()
    find(): Promise<PipelineTasks[]>{
        return this.pipelineTasksService.find();
    }

    @Get('userId/:userId/pipelineId/:pipelineId')
    findParams(@Param() params): Promise<PipelineTasks[]>{
        return this.pipelineTasksService.find(params);
    }

    @Get('times-sum')
    timesSum(): Promise<any>{
        return this.pipelineTasksService.timesSum();
    }

    @Get('times-sum/userId/:userId/pipelineId/:pipelineId')
    timesSumByParam(@Param() params): Promise<any>{
        return this.pipelineTasksService.timesSum(params);
    }

    @Post()
    create(@Body() pipelineTask: PipelineTasksDto): Promise<PipelineTasks>{
        return this.pipelineTasksService.create(pipelineTask);
    }

    @Put()
    save(@Body() pipelineTask: PipelineTasksDto): Promise<PipelineTasks>{
        return this.pipelineTasksService.save(pipelineTask);
    }

    @Delete()
    remove(@Body() pipelineTask:PipelineTasksDto): Promise<any> {
        return this.pipelineTasksService.remove(pipelineTask);
    }
}
