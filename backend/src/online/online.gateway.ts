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
  private onlineUsers: Map<string, number> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    // console.log("connect", Number(client.handshake.query.userId))
    const userId = Number(client.handshake.query.userId);
    if (userId < 1)
      return
    this.onlineUsers.set(client.id, userId);
    const myset: Set<number> = new Set();
    Array.from(this.onlineUsers).map((item) => myset.add(item[1]))
    this.server.emit('updateOnlineUsers', Array.from(myset));
    // console.log(Array.from(myset))
  }
  handleDisconnect(client: Socket) {
    this.onlineUsers.delete(client.id);
    const myset: Set<number> = new Set();
    Array.from(this.onlineUsers).map((item) => myset.add(item[1
    ]))
    this.server.emit('updateOnlineUsers', Array.from(myset));
    // console.log(Array.from(myset))
  }
  @SubscribeMessage('areYouReady')
  handleCreatInfo(client: Socket, Info: any): void {
    this.server.emit("areYouReady", Info)
    // console.log(Info)
  }
}

