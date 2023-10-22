import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // You should have a Prisma service
import { User } from '@prisma/client';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findByUserId(id: number): Promise<User | undefined> {
    // Replace this with your actual logic to find a user by username
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }
  async makeUserInGame(id: number): Promise<User | undefined> {
    // Replace this with your actual logic to find a user by username
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isOnline: true, // You can set a status to track the request (e.g., 'pending', 'accepted', 'rejected')
      }
    });

    return user;
  }
  async makeUserOutGame(id: number): Promise<User | undefined> {
    // Replace this with your actual logic to find a user by username
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isOnline: false, // You can set a status to track the request (e.g., 'pending', 'accepted', 'rejected')
      }
    });

    return user;
  }
  async findAllUsers(userAId: number) {
    const users = await this.prisma.user.findMany();
    const filteredUsers = users.filter(user => user.id !== userAId);
    return filteredUsers;
  }
  async findOneUsers(userAId: number, userName: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userAId,
        username: userName
      }
    });
    if (!user) {

      throw new UnauthorizedException();
    }
    return user;
  }
}
