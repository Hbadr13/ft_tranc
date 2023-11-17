import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {

    // constructor(private prisma: PrismaService) {
    // }

    async getMessage(params: string) {
        // return await this.prisma.message.findMany({ where: { userId: Number(params) } });
    }

    async createMessage(body, params: string) {
        // await this.prisma.message.create({
        //     data: {
        //         text: body.text,
        //         user: {
        //             connect: {
        //                 id: Number(params)
        //             },
        //         }
        //     }
        // })
    }

    async DeleteMessage(params: string) {
        // return await this.prisma.message.deleteMany({ where: { id: Number(params) } })
    }

}
