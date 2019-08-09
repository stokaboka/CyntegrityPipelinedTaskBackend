/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {Body, Controller, Get, Post, Param} from '@nestjs/common';
import {PipesService} from "./pipes.service";
import {Pipes} from "./pipes.interface";
import {PipesDto} from "./pipes.dto";

@Controller('pipes')
export class PipesController {
    constructor(private readonly pipesService: PipesService){}

    @Get()
    find(@Param() params): Promise<Pipes[]>{
        return this.pipesService.find();
    }

    @Post()
    create(@Body() pipe:PipesDto): Promise<Pipes>{
        return this.pipesService.create(pipe);
    }
}
