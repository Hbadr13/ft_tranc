import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { roomDto } from '../dto/game';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

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
      },
    });
    return data;
  }
  async deleteRome(userId: number) {
    const data = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        room: '',
      },
    });
    return data;
  }
}
