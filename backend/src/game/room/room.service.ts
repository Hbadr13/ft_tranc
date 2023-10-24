import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async getRoom(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user.room;
  }
  async creatRoom(userId: number, room: string) {
    const data = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        room: room,
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
