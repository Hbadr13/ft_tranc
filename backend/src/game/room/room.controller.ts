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
  @Post()
  async creatRoom(@Req() req: Request, @Body() body: roomDto) {
    return this.roomService.creatRoom(Number(req['id']), body);
  }
  @Post('/play')
  async startGame(@Req() req: Request, @Body() body: playDto) {
    return this.roomService.startGame(Number(req['id']), body);
  }
  @Post('/settings')
  async choiseSettingGame(@Req() req: Request, @Body() body: playDto) {
    // console.log(body)
    // return this.roomService.choiseSettingGame(Number(req['id']), body);
  }
  @Delete()
  async deleteRoom(@Req() req: Request) {
    return this.roomService.deleteRoom(Number(req['id']));
  }
}
