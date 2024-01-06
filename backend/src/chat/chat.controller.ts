import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {
    }

    /******************************************************* Channel Message ****************************************************************/

    @Post('createChannel/:idUser')
    async CreateChannel(@Body() body, @Param('idUser') idUser: number) {
        await this.chatService.createChannel(body, Number(idUser))
    }

    @Post('joinChannel/:idUser/:idRoom/:password')
    async JoinChannel(@Param('idUser') idUser: number, @Param('idRoom') idRoom: number, @Param('password') password: string) {
        await this.chatService.joinChannel(Number(idUser), Number(idRoom), password)
    }

    @Get('allChannelByUserId/:idUser')
    async GetAllChannelByUserId(@Param('idUser') idUser: number) {
        return await this.chatService.getAllChannelByUserId(Number(idUser));
    }

    @Post('sendMessageToChannel/:idRoom/:idUser')
    async SendMessageToChannel(@Body() body, @Param('idRoom') idRoom: number, @Param('idUser') idUser: number) {
        await this.chatService.sendMessageToChannel(body, Number(idRoom), Number(idUser))
    }

    @Get('allMessagesChannel/:idUser/:idRoom')
    async GetallMessagesChannel(@Param('idUser') idUser: number, @Param('idRoom') idRoom: number) {
        return await this.chatService.getallMessagesChannel(Number(idUser), Number(idRoom))
    }
    @Get('listUserBlockedInChat/:idUser')
    async listUserBlockedInChat(@Param('idUser') idUser: number) {
        return await this.chatService.list_user_blocked_in_chat(Number(idUser))
    }
    @Get('upadteChannel/:idUser/:idRoom/:type/:password')
    async upadteChannel(@Param('idUser') idUser: number, @Param('idRoom') idRoom: number, @Param('type') type: string, @Param('password') password: string) {
        return await this.chatService.upadteChannel(Number(idUser), Number(idRoom), type, password)
    }

    @Get('allUsersChannel/:idRoom')
    async AllUsersChannel(@Param('idRoom') idRoom: number) {
        return await this.chatService.allUsersChannel(Number(idRoom))
    }
    @Get('OneChannel/:idRoom')
    async oneChannel(@Param('idRoom') idRoom: number) {
        return await this.chatService.oneChannel(Number(idRoom))
    }

    @Get('allChannel')
    async AllChannel() {
        return await this.chatService.allChannel()
    }

    @Post('setAdmin/:roomId/:participantId/:item')
    async SetAdmin(@Param('roomId') roomId: number, @Param('participantId') participantId: number, @Param('item') item: string) {
        await this.chatService.setAdmin(Number(roomId), Number(participantId),item)
    }


    /******************************************************* Direct Message ****************************************************************/

    @Post('directMessage/:idSender/:idReceiver')
    async SendDirectMessage(@Body() body, @Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        console.log("hana hana");
        await this.chatService.sendDirectMessage(body, Number(idSender), Number(idReceiver))
    }

    @Get('getConversationDirect/:idSender/:idReceiver')
    async GetConversationDirect(@Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        console.log("hana hana");
        return await this.chatService.getConversationDirect(Number(idSender), Number(idReceiver))
    }
    @Get('statusChatTwoUser/:idSender/:idReceiver')
    async StatusChatTwoUser(@Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        
        return await this.chatService.statusChatTwoUser(Number(idSender), Number(idReceiver))
    }
    @Post('blockChatTwoUser/:idSender/:idReceiver')
    async BlockChatTwoUser(@Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        
        return await this.chatService.blockChatTwoUser(Number(idSender), Number(idReceiver))
    }
    @Post('UnblockChatTwoUser/:idSender/:idReceiver')
    async UnblockChatTwoUser(@Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        
        return await this.chatService.unblockChatTwoUser(Number(idSender), Number(idReceiver))
    }

    @Delete('deleteConversationDirect/:idSender/:idReceiver')
    async DeleteConversationDirect(@Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        await this.chatService.deleteConversationDirect(Number(idSender), Number(idReceiver))
    }
    @Get('getConversationListDirect/:idUser/:type')
    async GetConversationListDirect(@Param('idUser') idUser: number, @Param('type') type: string) {
        return await this.chatService.getConversationListDirect(Number(idUser), type)
    }
}
