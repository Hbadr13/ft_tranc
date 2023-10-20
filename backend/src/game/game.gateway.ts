import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';



@WebSocketGateway(8000, { cors: '*' })

export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private players: Array<{ _client: Socket; _room: string }> = [];
  private rromes: Map<string, number> = new Map<string, number>();


  handleConnection(client: Socket) {
    console.log(`Game: Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    const user = this.players.find((item) => item._client.id == client.id);
    this.players = this.players.filter((item) => item._client.id != client.id);
    console.log(`Game: Client disconnected: ${client.id}`);
    if (user) {
      // console.log('room :', this.rromes.get(user._room), "name: ", user._room)
      client.to(user._room).emit('leaveRoom', {})
      if (this.rromes.get(user._room) === 1)
        client.to(user._room).emit('availableRoom')
      this.rromes.delete(user._room)
    }
  }

  @SubscribeMessage('documentHidden')
  handleMessage(client: Socket, flag: boolean): void {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) {
      client.to(user._room).emit('documentHidden', flag);
    }
  }

  @SubscribeMessage('joinRoom')
  handleCreatRoom(client: Socket, { room, userId }): void {
    if (!this.rromes.get(room))
      this.rromes.set(room, 1)
    else
      this.rromes.set(room, this.rromes.get(room) + 1)
    // console.log(this.rromes.get(room))
    // console.log(userId)
    this.players.push({ _client: client, _room: room });
    client.join(room);
    const filtr = this.players.filter((item) => item._room === room);
    const index = this.players.findIndex(
      (item) => item._client.id === client.id,
    );
    if (index != -1) client.emit('indexPlayer', index);
    if (this.rromes.get(room) == 2) this.server.to(room).emit('start', 2);
  }



  @SubscribeMessage('update1')
  handleCreatpostion1(client: Socket, y: number): void {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) client.to(user._room).emit('posY', y);
  }

  @SubscribeMessage('update2')
  handleCreatpostion2(client: Socket, y: number): void {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) client.to(user._room).emit('posX', y);
  }


  @SubscribeMessage('moveBall')
  handleMoveBall(client: Socket, ball: any): void {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) this.server.to(user._room).emit('movebb', ball);
  }

  @SubscribeMessage('startWithComputer')
  handlestartWithComputer(client: Socket): void {
    client.emit('start');
  }


  @SubscribeMessage("ResumePause")
  handlegameResumePause(client: Socket, index: number): void {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) client.to(user._room).emit('ResumePause', index);
  }
}



