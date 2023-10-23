import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // You should have a Prisma service
import { User } from '@prisma/client';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

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
  async findOneUsers(userAId: number, userName: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userAId,
        username: userName
      }
    });
    if(!user) {

      throw new UnauthorizedException();
  }
    return user;
  }
  async apdate_user(userAId: number, userName: string, foto_user: string, email:string)
  {
    console.log(email, userName, foto_user)
    if(foto_user==="male")
          foto_user="https://i.pinimg.com/564x/dc/51/61/dc5161dd5e36744d184e0b98e97d31ba.jpg";
     else if(foto_user==="female")
        foto_user="https://i.pinimg.com/564x/30/c7/1b/30c71b3c02f31c2f3747c9b7404d6880.jpg"; 
    const user = await this.prisma.user.update({
      where: {
        id: userAId,
      },
      data: {
        username: userName,
        email: email,
        foto_user: foto_user
      },
    });
  }
}