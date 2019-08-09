/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {Body, Controller, Get, Post, Param, Put, Delete} from '@nestjs/common';
import {PipelinesService} from "./pipelines.service";
import {Pipelines} from "./pipelines.interface";
import {PipelinesDto} from "./pipelines.dto";

@Controller('pipelines')
export class PipelinesController {
    constructor(private readonly pipelinessService: PipelinesService){}

    @Get()
    find(): Promise<Pipelines[]>{
        return this.pipelinessService.find();
    }

    @Get('userId/:userId')
    findParams(@Param() params): Promise<Pipelines[]>{
        return this.pipelinessService.find(params);
    }

    @Post()
    create(@Body() pipeline:PipelinesDto): Promise<Pipelines>{
        return this.pipelinessService.save(pipeline);
    }

    @Put()
    save(@Body() pipeline:PipelinesDto): Promise<Pipelines>{
        return this.pipelinessService.save(pipeline);
    }

    @Delete()
    remove(@Body() pipeline:PipelinesDto): Promise<any> {
        return this.pipelinessService.remove(pipeline);
    }
}
