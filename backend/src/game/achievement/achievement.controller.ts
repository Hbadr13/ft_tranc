import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementDto } from '../dto/game';

@Controller('game/achievement')
export class AchievementController {
  constructor(private readonly roomService: AchievementService) { }
  @Get('/:userId')
  async getLevel(@Param('userId') userId: string) {
    return this.roomService.getLevel(Number(userId));
  }
  @Post('/:userId')
  async updateLevel(@Param('userId') userId: string, @Body() body: AchievementDto) {
    return this.roomService.updateLevel(Number(userId), body);
  }
  // @Delete('/:userId')
  // async deleteRoom(@Param('userId') userId: string) {
  //   return this.roomService.deleteRoom(Number(userId));
  // }
}
