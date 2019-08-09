/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {Body, Controller, Delete, Get, Put, Param, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {Users} from "./users.interface";
import {UsersDto} from "./users.dto";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService){}

    @Get()
    find(@Param() params): Promise<Users[]> {
        return this.usersService.find();
    }

    @Post()
    create(@Body() user:UsersDto): Promise<Users> {
        return this.usersService.create(user);
    }

    @Put()
    save(@Body() user:UsersDto): Promise<Users> {
        return this.usersService.save(user);
    }

    @Delete()
    remove(@Body() user:UsersDto): Promise<any> {
        return this.usersService.remove(user);
    }
}
