import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {
    }

    @Get('/:id/:id1')
    async findAll(@Param('id') params: string, @Param('id1') params1: string) {
        return await this.chatService.getMessage(params, params1);
    }

    @Post('/:id')
    async create(@Body() body) {
        await this.chatService.createMessage(body);
    }

    @Delete('/:id')
    async DeletedMessage(@Param('id') params: string) {
        return this.chatService.DeleteMessage(params);
    }
}
