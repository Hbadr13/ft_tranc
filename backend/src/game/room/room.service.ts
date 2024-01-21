import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { playDto, roomDto } from '../dto/game';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) { }

  async getRoom(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
  async creatRoom(userId: number, body: roomDto) {
    const data = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        room: body.room,
        opponentId: Number(body.opponentId),
      },
    });
    return data;
  }
  async choiseSettingGame(userId: number, body: playDto) {
    // console.log(body)
    const data = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        gameStatus: body.gameStatus
      },
    });
    return data;
  }
  async startGame(userId: number, body: playDto) {
    const data = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        gameStatus: body.gameStatus
      },
    });
    return data;
  }
  async deleteRoom(userId: number) {
    const data = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        room: '',
        opponentId: 0,
        isOnline: false,
        gameStatus: ''
      },
    });
    return data;
  }
}
 