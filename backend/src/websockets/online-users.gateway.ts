import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Socket } from 'socket.io';
import { Socket, Server } from 'socket.io';
// @WebSocketGateway()
@WebSocketGateway(9003, { cors: '*' })
export class OnlineUsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
    // private readonly logger = new Logger(OnlineUsersGateway.name);
    private onlineUsers: Set<string> = new Set();
    @WebSocketServer()
    server: Server;
    handleConnection(client: Socket) {
        console.log("Client disconnected:")
        // this.logger.log(`Client connected: ${client.id}`);
        this.onlineUsers.add(client.id);
        this.server.emit('updateOnlineUsers', Array.from(this.onlineUsers));
        // this.broadcastOnlineUsers();
    }

    handleDisconnect(client: Socket) {
        // this.logger.log(`Client disconnected: ${client.id}`);
        this.onlineUsers.delete(client.id);
        this.server.emit('updateOnlineUsers', Array.from(this.onlineUsers));
        // this.broadcastOnlineUsers();
    }

    private broadcastOnlineUsers() {
        this.server.emit('updateOnlineUsers', Array.from(this.onlineUsers));
    }
}
