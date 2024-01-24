

import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { playDto, roomDto } from '../dto/game';
import { Request } from 'express';

@Controller('game/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }
  @Get()
  async getRoom(@Req() req: Request) {
    return this.roomService.getRoom(Number(req['id']));
  }
  @Post('/:userId')
  async creatRoom(@Param('userId') userId: string, @Body() body: roomDto) {
    return await this.roomService.creatRoom(Number(userId), body);
  }
  @Post('/play/:id')
  async startGame(@Req() req: Request, @Body() body: playDto) {
    return await this.roomService.startGame(Number(req['id']), body);
  }

  @Delete()
  async deleteRoom(@Req() req: Request) {
    return this.roomService.deleteRoom(Number(req['id']));
  }
}