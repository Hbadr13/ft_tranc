import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {

    }

    /******************************************************* Channel Message ****************************************************************/

    @Post('createChannel')
    async CreateChannel(@Req() req: Request, @Body() body: { people: number[] }) {
        await this.chatService.createChannel(body, Number(req['id']))
    }

    @Post('joinChannel/:idRoom/:password')
    async JoinChannel(@Req() req: Request, @Param('idUser') idUser: number, @Param('idRoom') idRoom: number, @Param('password') password: string) {
        await this.chatService.joinChannel(Number(req['id']), Number(idRoom), password)
    }

    @Get('allChannelByUserId')
    async GetAllChannelByUserId(@Req() req: Request) {
        return await this.chatService.getAllChannelByUserId(Number(req['id']));
    }

    @Post('sendMessageToChannel/:idRoom')
    async SendMessageToChannel(@Req() req: Request, @Body() body, @Param('idRoom') idRoom: number) {
        // try {
        await this.chatService.sendMessageToChannel(body, Number(idRoom), Number(req['id']))
        //  } catch (error) {
        //     console.log(error);
        // }
    }

    @Get('allMessagesChannel/:idRoom')
    async GetallMessagesChannel(@Req() req: Request, @Param('idRoom') idRoom: number) {
        return await this.chatService.getallMessagesChannel(Number(req['id']), Number(idRoom))
    }

    @Get('upadteChannel/:idRoom/:type/:password')
    async upadteChannel(@Req() req: Request, @Param('idRoom') idRoom: number, @Param('type') type: string, @Param('password') password: string) {
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

    @Get('allChannel')
    async AllChannel(@Req() req: Request) {
        return await this.chatService.allChannel(Number(req['id']))
    }

    @Post('setAdmin/:roomId/:participantId/:item/:duration')
    async SetAdmin(@Req() req: Request, @Param('roomId') roomId: number, @Param('participantId') participantId: number, @Param('item') item: string, @Param('duration') duration: string) {
        await this.chatService.setAdmin(Number(req['id']), Number(roomId), Number(participantId), item, duration)
    }

    @Post('addParticipants/:roomId')
    async AddParticipants(@Req() req: Request, @Body() body: { people: number[] }, @Param('roomId') roomId: number) {
        await this.chatService.addParticipants(Number(roomId), body)
    }

    @Get('myStatusInRoom/:roomId')
    async MyStatusInRoom(@Req() req: Request, @Param('roomId') roomId: number) {
        return await this.chatService.myStatusInRoom(Number(req['id']), Number(roomId))
    }

    /******************************************************* Direct Message ****************************************************************/

    @Post('directMessage/:idReceiver')
    async SendDirectMessage(@Req() req: Request, @Body() body, @Param('idReceiver') idReceiver: number) {
        // try {
        await this.chatService.sendDirectMessage(body, Number(req['id']), Number(idReceiver))
        // } catch (error) {

        // }
    }

    @Get('getConversationDirect/:idReceiver')
    async GetConversationDirect(@Req() req: Request, @Param('idReceiver') idReceiver: number) {
        // try {
        return await this.chatService.getConversationDirect(Number(req['id']), Number(idReceiver))

        // } catch (error) {

        // }
    }
    @Get('statusChatTwoUser/:idReceiver')
    async StatusChatTwoUser(@Req() req: Request, @Param('idReceiver') idReceiver: number) {

        return await this.chatService.statusChatTwoUser(Number(req['id']), Number(idReceiver))
    }
    @Post('blockChatTwoUser/:idReceiver')
    async BlockChatTwoUser(@Req() req: Request, @Param('idReceiver') idReceiver: number) {

        return await this.chatService.blockChatTwoUser(Number(req['id']), Number(idReceiver))
    }
    @Post('UnblockChatTwoUser/:idReceiver')
    async UnblockChatTwoUser(@Req() req: Request, @Param('idReceiver') idReceiver: number) {
        return await this.chatService.unblockChatTwoUser(Number(req['id']), Number(idReceiver))
    }

    @Get('listUserBlockedInChat')
    async listUserBlockedInChat(@Req() req: Request) {
        return await this.chatService.list_user_blocked_in_chat(Number(req['id']))
    }

    @Get('getConversationListDirect/:type')
    async GetConversationListDirect(@Req() req: Request, @Param('type') type: string) {
        return await this.chatService.getConversationListDirect(Number(req['id']), type)
    }
}