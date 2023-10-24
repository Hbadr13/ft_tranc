import { Injectable } from '@nestjs/common';
import { updateDto } from '../dto/game';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UpdateService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUsershistory(userid: Number, body: updateDto) {
    try {
      await this.prisma.history.create({
        data: {
          myGools: Number(body.myGools),
          opponentGools: Number(body.opponentGools),
          stauts: body.stauts,
          opponentId: Number(body.opponentId),
          user: {
            connect: {
              id: Number(userid),
            },
          },
        },
      });
    } catch (error) {
      // Record to update not found. error code P2025.
      console.log(error.code);
    }
  }

  async getUsershistory(userid: number) {
    return this.prisma.history.findMany({
      where: {
        user: {
          id: userid,
        },
      },
    });
  }

  async getUsersCustomhistory(userid: number, customid: number) {
    return this.prisma.history.findMany({
      where: {
        user: {
          id: userid,
        },
        opponentId: customid,
      },
    });
  }
}
