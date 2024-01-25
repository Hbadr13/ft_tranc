import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { parse } from 'cookie';
import { exit } from 'process';
import { Server, Socket } from 'socket.io';
import { Constant } from 'src/constants/constant';
import { PrismaService } from 'src/prisma/prisma.service';
import { OnlineService } from './online.service';
import * as cookieParser from 'cookie-parser';

export interface userProps {

  id: number,
  createdAt: string,
  updatedAt: string,
  email: string,
  hash: string,
  username: string,
  firstName: string,
  lastName: string,
  foto_user: string,
  isOnline: boolean,
  userId: number
  room: string
}
@WebSocketGateway(
  {
    cors: {
      // origin: '*'

      origin: Constant.API_URL,
      credentials: true,
    },
    namespace: 'OnlineGateway'
  }
)
export class OnlineGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  onlineUsers: Map<Socket, number> = new Map();
  searchForOpponent: Map<Socket, userProps> = new Map();
  userInGame: Map<number, Socket> = new Map()

  constructor(private prisma: PrismaService, private onlineService: OnlineService) { }
  async handleConnection(client: Socket) {
    try {

      const auth_cookie = parse(client.handshake.headers.cookie).jwt;
      const user = await this.onlineService.checkuserIfAuth(auth_cookie)
      console.log('=>', user.id)
      const userId = user.id
      client.handshake.query.userId = String(user.id);
      this.onlineUsers.set(client, userId);
      const myset: Set<number> = new Set();
      Array.from(this.onlineUsers).map((item) => myset.add(item[1]))
      this.server.emit('updateOnlineUsers', Array.from(myset));
    } catch (error) {
      console.log('errro..')
      client.disconnect();
    }
  }
  async handleDisconnect(client: Socket) {
    try {
      this.matchingRoom.forEach((value, index) => {
        if (value.socketplayer1 == client || value.socketplayer2 == client) {
          value.socketplayer1.emit('withdrawalFromMatching');
          value.socketplayer2.emit('withdrawalFromMatching');
          this.searchForOpponent.delete(client)
          this.matchingRoom.splice(index, 1)
        }
      })
      this.searchForOpponent.delete(client)
      const userid = Number(client.handshake.query.userId)
      if (userid < 1)
        return
      this.onlineUsers.delete(client);
      const myset: Set<number> = new Set();
      Array.from(this.onlineUsers).map((item) => myset.add(item[1]))
      this.server.emit('updateOnlineUsers', Array.from(myset));
      if (this.userInGame.get(userid)) {
        if (this.userInGame.get(userid).id == client.id) {
          await this.prisma.user.update({
            where: { id: userid },
            data: {
              room: '',
              isOnline: false,
              gameStatus: '',
              opponentId: 0
            }
          })
          this.userInGame.delete(userid)
        }
      }
      // console.log('------>', userid)
      if (!this.userInGame.get(userid)) {
        await this.prisma.user.update({
          where: { id: userid },
          data: {
            room: '',
            isOnline: false,
            gameStatus: '',
            opponentId: 0
          }
        })
      }
    } catch (error) {
      // console.log(error)
    }
  }
  @SubscribeMessage('Logout')
  handleLogout(client: Socket) {
    this.onlineUsers.delete(client);
    const myset: Set<number> = new Set();
    Array.from(this.onlineUsers).map((item) => myset.add(item[1]))
    this.server.emit('updateOnlineUsers', Array.from(myset));

  }
  @SubscribeMessage('userjointToGame')
  handleuserjointToGame(client: Socket, { userId }) {
    if (userId < 1)
      return
    // console.log('joint room', userId)
    if (!this.userInGame.get(userId)) {
      this.userInGame.set(userId, client)
    }
  }
  @SubscribeMessage('DeleteuserFromGame')
  async handleDeleteUserFromGame(client: Socket, { userId }) {
    console.log('remove client from game', userId)
    if (userId < 1)
      return
    if (this.userInGame.get(userId)) {
      if (this.userInGame.get(userId).id == client.id) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            room: '',
            isOnline: false,
            gameStatus: '',
            opponentId: 0

          }
        })
        this.userInGame.delete(userId)
      }
    }
    // if(this.userInGame.get())
  }


  @SubscribeMessage('areYouReady')
  handleAreYouReady(client: Socket, { OpponentId, currentPlayer, room }: { OpponentId: string, currentPlayer: userProps, room: string }): void {
    this.onlineUsers.forEach((value: any, key: any) => {
      if (value == OpponentId) {
        const opponentSocket = client.id
        key.emit("areYouReady", { opponentSocket, OpponentId, currentPlayer, room })
      }
    })
  }
  @SubscribeMessage('rejectRequest')
  handlerejectRequest(client: Socket, { opponentSocket, currentUser, opponent, room }: { room: string, opponentSocket: any, currentUser: userProps, opponent: userProps }): void {
    // console.log('reject', currentUser.username, opponent.username)
    this.onlineUsers.forEach((value: any, key: any) => {
      // if (value == opponent.id) {
      if (key.id == opponentSocket) {
        key.emit("rejectRequest", { _opponent: currentUser, _room: room })
      }
    })
  }

  @SubscribeMessage('rejectAcceptRequesthidden')
  handlrejectAcceptRequesthidden(client: Socket, { opponentSocket, currentUser }: { opponentSocket, currentUser: userProps }): void {
    this.onlineUsers.forEach((value: any, key: any) => {
      if (value == currentUser.id) {
        // if (key.id == opponentSocket) {
        key.emit("rejectAcceptRequesthidden")
      }
    })
  }
  private matchingRoom: Array<{ socketplayer1: Socket, player1: userProps, p1IsStart: boolean, socketplayer2: Socket, player2: userProps, p2IsStart: boolean }> = new Array();
  @SubscribeMessage('searchForOpponent')
  handelSearchForOpponent(client: Socket, { currentUser }: { currentUser: userProps }): void {
    if (currentUser.id < 1)
      return
    try {
      this.searchForOpponent.forEach((user_value: any, sock_key: any) => {
        if (currentUser.id == user_value.id) {
          throw new Error('ExitLoopException');
        }
      })
      if (currentUser.username != '' && client != undefined) {
        this.searchForOpponent.set(client, currentUser)
        this.searchForOpponent.forEach((user_value: any, sock_key: any) => {
          const find = this.matchingRoom.find((item) => {
            return item.socketplayer1 == sock_key || item.socketplayer2 == sock_key
          })
          if (!find && currentUser.id != user_value.id) {
            sock_key.emit('searchForOpponent', currentUser)
            client.emit('searchForOpponent', user_value)
            this.matchingRoom.push({ socketplayer1: client, player1: user_value, p1IsStart: false, socketplayer2: sock_key, player2: currentUser, p2IsStart: false })
            throw new Error('ExitLoopException');
          }
        })
      }
    } catch (error) {
    }
  }
  @SubscribeMessage('deleteFromsearchForOpponent')
  handeldeleteFromsearchForOpponent(client: Socket): void {
    this.searchForOpponent.delete(client)
  }
  @SubscribeMessage('withdrawalFromMatching')
  handelwithdrawalFromMatching(client: Socket): void {
    this.searchForOpponent.delete(client)
    this.matchingRoom.forEach((value, index) => {
      if (value.socketplayer1 == client || value.socketplayer2 == client) {
        value.socketplayer1.emit('withdrawalFromMatching');
        value.socketplayer2.emit('withdrawalFromMatching');
        this.searchForOpponent.delete(client)
        this.matchingRoom.splice(index, 1)
      }
    })
  }
  @SubscribeMessage('JoinMatch')
  handleDisconnecta(client: Socket) {
    this.matchingRoom.forEach((value, index) => {
      if (value.socketplayer2 == client) {
        value.socketplayer1.emit('JoinMatch');
        if (value.p1IsStart == true)
          value.socketplayer2.emit('JoinMatch');
        value.p2IsStart = true
      }
      else if (value.socketplayer1 == client) {
        value.socketplayer2.emit('JoinMatch');
        if (value.p2IsStart == true)
          value.socketplayer1.emit('JoinMatch');
        value.p1IsStart = true
      }
      if (value.p1IsStart == true && value.p2IsStart == true) {
        this.searchForOpponent.delete(value.socketplayer1)
        this.searchForOpponent.delete(value.socketplayer2)
      }
    })
  }
}