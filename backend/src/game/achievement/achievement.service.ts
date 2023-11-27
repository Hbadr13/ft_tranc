import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AchievementDto } from '../dto/game';
// import { roomDto } from '../dto/game';

@Injectable()
export class AchievementService {
  constructor(private readonly prisma: PrismaService) { }

  async getLevel(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user.level;
  }
  async updateLevel(userId: number, body: AchievementDto) {
    let newLevel: number = 0

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      }
    });
    if (user.level < 5)
      newLevel = body.points / 100

    else if (user.level < 7)
      newLevel = body.points / 200

    else if (user.level < 10)
      newLevel = body.points / 250
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        level: user.level + newLevel
      },
    });
    // return data;
  }
  // async deleteRoom(userId: number) {
  //   const data = await this.prisma.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       room: '',
  //     },
  //   });
  //   return data;
  // }
}
