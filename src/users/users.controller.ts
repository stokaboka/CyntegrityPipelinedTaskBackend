import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
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
}
