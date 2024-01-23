import { Body, Controller, Delete, Get, Req, Param, Post } from '@nestjs/common';

import { historyDto } from '../dto/game'
import { HistoryService } from './history.service';
@Controller('game/history')
export class HistoryController {

    constructor(private readonly updateService: HistoryService) { }
    @Post()
    async updateUsershistory(@Req() req: Request, @Body() body: historyDto) {
        try {
            return this.updateService.updateUsershistory(Number(req['id']), body)
        } catch (error) {

        }
    }

    @Get()
    async getUsershistory(@Req() req: Request,) {
        try {
            return await this.updateService.getUsershistory(Number(req['id']))
        } catch (error) {

        }
    }
    @Get(':customid')
    async getUsersCustomhistory(@Req() req: Request, @Param('customid') customid: string) {
        try {
            return this.updateService.getUsersCustomhistory(Number(req['id']), Number(customid))
        } catch (error) {

        }
    }
    @Delete()
    async clearUsershistory(@Req() req: Request,) {
        try {
            return this.updateService.clearUsershistory(Number(req['id']))
        } catch (error) {

        }
    }
    @Delete(':customid')
    async clearUsersCustomhistory(@Req() req: Request, @Param('customid') customid: string) {
        try {
            return this.updateService.clearUsersCustomhistory(Number(req['id']), Number(customid))
        } catch (error) {

        }
    }
}
