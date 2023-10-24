import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('game/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get('/:userId')
  async getRoom(@Param('userId') userId: string) {
    return this.roomService.getRoom(Number(userId));
  }
  @Post('/:userId/:room')
  async creatRoom(@Param('userId') userId: string,@Param('room') room: string) {
    return this.roomService.creatRoom(Number(userId),room);
  }
  @Delete('/:userId')
  async deleteRome(@Param('userId') userId: string) {
    return this.roomService.deleteRome(Number(userId));
  }
}
