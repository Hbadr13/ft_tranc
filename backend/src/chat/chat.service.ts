import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {

    constructor(private prisma: PrismaService) {
    }

    async getMessage(params: string, params1: string) {
        return await this.prisma.message.findMany({
            where: {senderId: Number(params) ,receiverId: Number(params1)},
        })
    }

    async createMessage(body) {

        await this.prisma.message.create({
            data: {
                text: body.text,
                sender: { connect: { id: body.senderId } },
                receiver: { connect: { id: body.receiverId } },
            },
            include: {
                sender: true,
                receiver: true,
            },
        });

    }

    async DeleteMessage(params: string) {
    }

}
