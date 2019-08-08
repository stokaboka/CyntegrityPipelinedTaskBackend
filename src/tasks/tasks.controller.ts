/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Tasks} from "./tasks.interface";
import {TasksDto} from "./tasks.dto";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @Get()
    find(@Param() params): Promise<Tasks[]>{
        return this.tasksService.find();
    }

    @Post()
    create(@Body() task: TasksDto): Promise<Tasks>{
        return this.tasksService.create(task);
    }
}
