import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpdateService } from './update.service';

import { updateDto } from '../dto/game'
@Controller('game/update')
export class UpdateController {

    constructor(private readonly updateService: UpdateService,) { }
    @Post(':id')
    async updateUsershistory(@Param('id') userid: string, @Body() body: updateDto) {
        return this.updateService.updateUsershistory(Number(userid), body)
    }

    @Get(':id')
    async getUsershistory(@Param('id') userid: string,) {
        return this.updateService.getUsershistory(Number(userid))
    }   
    @Get(':id/:customid')
    async getUsersCustomhistory(@Param('id') userid: string, @Param('customid') customid: string) {
        return this.updateService.getUsersCustomhistory(Number(userid), Number(customid))
    }
}
