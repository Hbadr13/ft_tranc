import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


export interface userProps{
  
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


  private online: Array<{ _sockerId: string, _userId: number }> = [];

  handleConnection(client: Socket, ...args: any[]) {
    const userId = Number(client.handshake.query.userId);
    // if(userId > 0)
    this.online.push({ _sockerId: client.id, _userId: userId });
    // console.log(this.online)
    console.log(`online: Client connected: ${client.id}   :${userId}`);
  }

  handleDisconnect(client: Socket) {
    // const date = Date();
    // const user = this.players.find((item) => item._client.id == client.id);
    // console.log("---------------")    
    console.log(`online: Client disconnected: ${client.id}`);
    // console.log(this.online)
    this.online = this.online.filter((item) => {
      if(item._sockerId == client.id)
        this.server.emit('disconnected',item._userId)
      return item._sockerId != client.id
    });
  }

  @SubscribeMessage('joinRoom')
  handleCreatRoom(client: Socket, room: string): void {
    // this.players.push({ _client: client, _room: room });
    // client.join(room);
    // const filtr = this.players.filter((item) => item._room === room);
    // const index = this.players.findIndex(
    //   (item) => item._client.id === client.id,
    // );
    // if (index != -1) client.emit('indexPlayer', index);
    // if (filtr.length == 2) this.server.emit('start', filtr.length);
  }
  @SubscribeMessage('allAmis')
  handleCreatRoom1(client: Socket, amis: Array<userProps>): void {
    if(amis.length <1)
      return
    amis.map((item: any) => this.online.map((usr) => {
      if(item.id === usr._userId)
        item.isOnline = true
    }).length)
    console.log(amis)

    client.emit("amisOnline", amis)
  }

}

