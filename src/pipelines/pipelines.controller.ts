/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {Body, Controller, Get, Post, Param} from '@nestjs/common';
import {PipelinesService} from "./pipelines.service";
import {Pipelines} from "./pipelines.interface";
import {PipelinesDto} from "./pipelines.dto";

@Controller('pipelines')
export class PipelinesController {
    constructor(private readonly pipesService: PipelinesService){}

    @Get()
    find(@Param() params): Promise<Pipelines[]>{
        return this.pipesService.find();
    }

    @Post()
    create(@Body() pipe:PipelinesDto): Promise<Pipelines>{
        return this.pipesService.create(pipe);
    }
}
