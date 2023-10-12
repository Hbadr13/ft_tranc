import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // You should have a Prisma service
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async findByUsername(id: number): Promise<User | undefined> {
    // Replace this with your actual logic to find a user by username
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    
    return user;
  }
  async findAllUsers(userAId: number) {
    const users = await this.prisma.user.findMany();
    const filteredUsers = users.filter(user => user.id !== userAId);
    return filteredUsers;
  }
  }