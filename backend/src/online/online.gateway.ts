import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';





@WebSocketGateway(8001, { cors: '*' })
export class OnlineGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;


  private players: Array<{ _client: Socket; _room: string }> = [];

  handleConnection(client: Socket) {
    console.log(`online: Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const date = Date();
    console.log(`online: Client disconnected: ${client.id}`);
    // const user = this.players.find((item) => item._client.id == client.id);
    // this.players = this.players.filter((item) => item._client.id != client.id);
    // console.log(`Game: Client disconnected: ${client.id}`);
    // if (user) client.to(user._room).emit('leaveRoom', {})
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
}


