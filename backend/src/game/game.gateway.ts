import io from 'socket.io-client';
import { UserService } from '../user/user.service';

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room/room.service';
import { UpdateService } from './update/update.service';
import { updateDto } from './dto/game';

@WebSocketGateway(8000, { cors: '*' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly updateserver: UpdateService,
  ) { }
  @WebSocketServer()
  server: Server;
  private players: Array<{ _client: Socket; _room: string }> = [];
  private rrooms: Map<string, number> = new Map<string, number>();

  private IdOfPlayer: Map<Socket, number> = new Map<Socket, number>();

  async handleConnection(client: Socket) {
    try {
      console.log('handle connect game gateway')
      const userId = Number(client.handshake.query.userId);
      if (userId < 1) return;
      this.IdOfPlayer.set(client, userId);
      const content = await this.userService.makeUserInGame(userId);
      // console.log(`Game: Client connected: ${this.IdOfPlayer.get(client)}`);
    } catch (error) { }
  }

  async handleDisconnect(client: Socket) {
    try {
      const user = this.players.find((item) => item._client.id == client.id);
      this.players = this.players.filter(
        (item) => item._client.id != client.id,
      );
      if (user) {
        client.to(user._room).emit('leaveRoom', {});
        if (this.rrooms.get(user._room) === 1)
          client.to(user._room).emit('availableRoom');
        this.rrooms.delete(user._room);
      }
      // console.log(`Game: Client disconnected: ${this.IdOfPlayer.get(client)}`);
      await this.userService.makeUserOutGame(this.IdOfPlayer.get(client));
      await this.roomService.deleteRoom(this.IdOfPlayer.get(client));
      this.IdOfPlayer.delete(client);
    } catch (error) { }
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
    console.log(userId);
    if (!this.rrooms.get(room)) {
      this.rrooms.set(room, 1);
    } else {
      this.rrooms.set(room, this.rrooms.get(room) + 1);
    }
    this.players.push({ _client: client, _room: room });
    client.join(room);

    const index = this.players.findIndex(
      (item) => item._client.id === client.id,
    );
    if (index != -1) client.emit('indexPlayer', this.rrooms.get(room) - 1);
    if (this.rrooms.get(room) == 2) this.server.to(room).emit('start', 2);
  }

  @SubscribeMessage('dataOfplayer')
  handleDataOfplayer(client: Socket, player: any) {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) client.to(user._room).emit('dataOfplayer', player);
  }

  @SubscribeMessage('dataOfcomputer')
  handleCreatpostion2(client: Socket, computer: any) {

    const user = this.players.find((item) => item._client.id == client.id);
    if (user) client.to(user._room).emit('dataOfcomputer', computer);
  }
  @SubscribeMessage('opponentId')
  handleOpponentId(client: Socket, id: Number): void {
    // console.log('opponentId:', id)
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) client.to(user._room).emit('opponentId', id);
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

  @SubscribeMessage('ResumePause')
  handlegameResumePause(client: Socket, index: number): void {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) client.to(user._room).emit('ResumePause', index);
  }
}
