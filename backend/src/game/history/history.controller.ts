import { Body, Controller, Delete, Get, Req, Param, Post } from '@nestjs/common';

import { historyDto } from '../dto/game'
import { HistoryService } from './history.service';
@Controller('game/history')
export class HistoryController {

    constructor(private readonly updateService: HistoryService) { }
    @Post()
    async updateUsershistory(@Req() req: Request, @Body() body: historyDto) {
        return this.updateService.updateUsershistory(Number(req['id']), body)
    }

    @Get()
    async getUsershistory(@Req() req: Request,) {
        return await this.updateService.getUsershistory(Number(req['id']))
    }
    @Get(':customid')
    async getUsersCustomhistory(@Req() req: Request, @Param('customid') customid: string) {
        return this.updateService.getUsersCustomhistory(Number(req['id']), Number(customid))
    }
    @Delete()
    async clearUsershistory(@Req() req: Request,) {
        return this.updateService.clearUsershistory(Number(req['id']))
    }
    @Delete(':customid')
    async clearUsersCustomhistory(@Req() req: Request, @Param('customid') customid: string) {
        return this.updateService.clearUsersCustomhistory(Number(req['id']), Number(customid))
    }
}
