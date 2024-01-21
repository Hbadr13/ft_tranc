import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { playDto, roomDto } from '../dto/game';

@Controller('game/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }
  @Get('/:userId')
  async getRoom(@Param('userId') userId: string) {
    return this.roomService.getRoom(Number(userId));
  }
  @Post('/:userId')
  async creatRoom(@Param('userId') userId: string, @Body() body: roomDto) {
    return this.roomService.creatRoom(Number(userId), body);
  }
  @Post('/play/:userId')
  async startGame(@Param('userId') userId: string, @Body() body: playDto) {
    // console.log(body, userId)
    return this.roomService.startGame(Number(userId), body);
  }
  @Post('/settings/:userId')
  async choiseSettingGame(@Param('userId') userId: string, @Body() body: playDto) {
    // console.log(body)
    // return this.roomService.choiseSettingGame(Number(userId), body);
  }
  @Delete('/:userId')
  async deleteRoom(@Param('userId') userId: string) {
    return this.roomService.deleteRoom(Number(userId));
  }
}
