import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { playDto, roomDto } from '../dto/game';

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

// import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
// import { RoomService } from './room.service';
// import { playDto, roomDto } from '../dto/game';
// import { Request } from 'express';

// @Controller('game/room')
// export class RoomController {
//   constructor(private readonly roomService: RoomService) { }
//   @Get()
//   async getRoom(@Req() req: Request) {
//     return this.roomService.getRoom(Number(req['id']));
//   }
//   @Post()
//   async creatRoom(@Req() req: Request, @Body() body: roomDto) {
//     return this.roomService.creatRoom(Number(req['id']), body);
//   }
//   @Post('/play')
//   async startGame(@Req() req: Request, @Body() body: playDto) {
//     return this.roomService.startGame(Number(req['id']), body);
//   }
//   @Post('/settings')
//   async choiseSettingGame(@Req() req: Request, @Body() body: playDto) {
//     // console.log(body)
//     // return this.roomService.choiseSettingGame(Number(req['id']), body);
//   }
//   @Delete()
//   async deleteRoom(@Req() req: Request) {
//     return this.roomService.deleteRoom(Number(req['id']));
//   }
// }