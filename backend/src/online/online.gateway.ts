import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


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
}

@WebSocketGateway(8001, { cors: '*' })
export class OnlineGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private onlineUsers: Map<Socket, number> = new Map();
  // private allSocket: Map<Socket, number> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    // console.log("connect", Number(client.handshake.query.userId))
    const userId = Number(client.handshake.query.userId);
    if (userId < 1)
      return
    this.onlineUsers.set(client, userId);
    const myset: Set<number> = new Set();
    Array.from(this.onlineUsers).map((item) => myset.add(item[1]))
    this.server.emit('updateOnlineUsers', Array.from(myset));
    // console.log(Array.from(myset))
  }
  handleDisconnect(client: Socket) {
    this.onlineUsers.delete(client);
    const myset: Set<number> = new Set();
    Array.from(this.onlineUsers).map((item) => myset.add(item[1]))
    this.server.emit('updateOnlineUsers', Array.from(myset));
    // console.log(Array.from(myset))
  }
  @SubscribeMessage('areYouReady')
  handleCreatInfo(client: Socket, { OpponentId, currentPlayer, pathOfGame }: { OpponentId: string, currentPlayer: userProps, pathOfGame: string }): void {
    this.onlineUsers.forEach((value: any, key: any) => {
      if (value == OpponentId) {
        key.emit("areYouReady", { OpponentId, currentPlayer, pathOfGame })
      }
    })

  }
  @SubscribeMessage('rejectRequest')
  handlerejectRequest(client: Socket, { currentUser, opponent }: { currentUser: userProps, opponent: userProps }): void {
    console.log('currentUser:', currentUser.username, "  opponent: ", opponent.username)
    this.onlineUsers.forEach((value: any, key: any) => {
      if (value == opponent.id) {
        key.emit("rejectRequest")
        // key.emit("areYouReady", { OpponentId, currentPlayer, pathOfGame })
      }
    })
  }
}

