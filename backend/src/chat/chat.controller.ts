import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {
    }
    
    @Get('/:id')
    async findAll(@Param('id') params: string) {
        return this.chatService.getMessage(params);
    }

    @Post('/:id')
    async create(@Body() body, @Param('id') params: string) {
       return this.chatService.createMessage(body, params);
    }

    @Delete('/:id')
    async DeletedMessage(@Param('id') params: string) {
        return this.DeletedMessage(params);
    }
}
