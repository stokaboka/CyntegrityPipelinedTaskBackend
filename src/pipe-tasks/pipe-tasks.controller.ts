/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PipeTasksService} from "./pipe-tasks.service";
import {PipeTasks} from "./pipe-tasks.interface";
import {PipeTasksDto} from "./pipe-tasks.dto";

@Controller('pipe-tasks')
export class PipeTasksController {
    constructor(private readonly pipeTasksService: PipeTasksService){}

    @Get()
    find(@Param() params): Promise<PipeTasks[]>{
        return this.pipeTasksService.find();
    }

    @Post()
    create(@Body() pipeTask: PipeTasksDto): Promise<PipeTasks>{
        return this.pipeTasksService.create(pipeTask);
    }
}
