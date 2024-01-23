import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {

    }

    /******************************************************* Channel Message ****************************************************************/

    @Post('createChannel/:idUser')
    async CreateChannel(@Req() req: Request, @Body() body: { people: number[] }, @Param('idUser') idUser: number, @Param('people') people: number[]) {
        await this.chatService.createChannel(body, Number(req['id']))
    }

    @Post('joinChannel/:idUser/:idRoom/:password')
    async JoinChannel(@Req() req: Request, @Param('idUser') idUser: number, @Param('idRoom') idRoom: number, @Param('password') password: string) {
        await this.chatService.joinChannel(Number(req['id']), Number(idRoom), password)
    }

    @Get('allChannelByUserId/:idUser')
    async GetAllChannelByUserId(@Req() req: Request, @Param('idUser') idUser: number) {
        return await this.chatService.getAllChannelByUserId(Number(req['id']));
    }

    @Post('sendMessageToChannel/:idRoom/:idUser')
    async SendMessageToChannel(@Req() req: Request, @Body() body, @Param('idRoom') idRoom: number, @Param('idUser') idUser: number) {
        await this.chatService.sendMessageToChannel(body, Number(idRoom), Number(req['id']))
    }

    @Get('allMessagesChannel/:idUser/:idRoom')
    async GetallMessagesChannel(@Req() req: Request, @Param('idUser') idUser: number, @Param('idRoom') idRoom: number) {
        return await this.chatService.getallMessagesChannel(Number(req['id']), Number(idRoom))
    }
    @Get('listUserBlockedInChat/:idUser')
    async listUserBlockedInChat(@Req() req: Request, @Param('idUser') idUser: number) {
        return await this.chatService.list_user_blocked_in_chat(Number(req['id']))
    }
    @Get('upadteChannel/:idUser/:idRoom/:type/:password')
    async upadteChannel(@Req() req: Request, @Param('idUser') idUser: number, @Param('idRoom') idRoom: number, @Param('type') type: string, @Param('password') password: string) {
        return await this.chatService.upadteChannel(Number(req['id']), Number(idRoom), type, password)
    }

    @Get('allUsersChannel/:idRoom')
    async AllUsersChannel(@Req() req: Request, @Param('idRoom') idRoom: number) {
        return await this.chatService.allUsersChannel(Number(idRoom))
    }
    @Get('OneChannel/:idRoom')
    async oneChannel(@Req() req: Request, @Param('idRoom') idRoom: number) {
        return await this.chatService.oneChannel(Number(idRoom))
    }


    @Get('allChannel/:userId')
    async AllChannel(@Req() req: Request, @Param('userId') userId: number) {
        return await this.chatService.allChannel(Number(req['id']))
    }

    @Post('setAdmin/:roomId/:participantId/:item')
    async SetAdmin(@Req() req: Request, @Param('roomId') roomId: number, @Param('participantId') participantId: number, @Param('item') item: string) {
        await this.chatService.setAdmin(Number(roomId), Number(participantId), item)
    }

    @Post('addParticipants/:roomId')
    async AddParticipants(@Req() req: Request, @Body() body: { people: number[] }, @Param('roomId') roomId: number) {
        await this.chatService.addParticipants(Number(roomId), body)
    }

    @Delete('leavingRoom/:userId/:roomId')
    async LeavingRoom(@Req() req: Request, @Param('userId') userId: number, @Param('roomId') roomId: number) {
        await this.chatService.LeavingRoom(Number(req['id']), Number(roomId))
    }

    /******************************************************* Direct Message ****************************************************************/

    @Post('directMessage/:idSender/:idReceiver')
    async SendDirectMessage(@Req() req: Request, @Body() body, @Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        await this.chatService.sendDirectMessage(body, Number(req['id']), Number(idReceiver))
    }

    @Get('getConversationDirect/:idSender/:idReceiver')
    async GetConversationDirect(@Req() req: Request, @Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        console.log("hana hana");
        return await this.chatService.getConversationDirect(Number(req['id']), Number(idReceiver))
    }
    @Get('statusChatTwoUser/:idSender/:idReceiver')
    async StatusChatTwoUser(@Req() req: Request, @Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {

        return await this.chatService.statusChatTwoUser(Number(req['id']), Number(idReceiver))
    }
    @Post('blockChatTwoUser/:idSender/:idReceiver')
    async BlockChatTwoUser(@Req() req: Request, @Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {

        return await this.chatService.blockChatTwoUser(Number(req['id']), Number(idReceiver))
    }
    @Post('UnblockChatTwoUser/:idSender/:idReceiver')
    async UnblockChatTwoUser(@Req() req: Request, @Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        return await this.chatService.unblockChatTwoUser(Number(req['id']), Number(idReceiver))
    }

    @Delete('deleteConversationDirect/:idSender/:idReceiver')
    async DeleteConversationDirect(@Req() req: Request, @Param('idSender') idSender: number, @Param('idReceiver') idReceiver: number) {
        await this.chatService.deleteConversationDirect(Number(req['id']), Number(idReceiver))
    }
    @Get('getConversationListDirect/:idUser/:type')
    async GetConversationListDirect(@Req() req: Request, @Param('idUser') idUser: number, @Param('type') type: string) {
        return await this.chatService.getConversationListDirect(Number(req['id']), type)
    }
}