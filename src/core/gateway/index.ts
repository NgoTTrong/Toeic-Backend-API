import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';
import { SocketService } from 'src/core/socket/socket.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://toeic-mastery-rho.vercel.app'],
    credentials: true,
    transports: ['websocket', 'polling'],
    secure: true,
    method: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
})
export class Gateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketService) {}
  private readonly logger = new Logger(Gateway.name);

  @WebSocketServer() io: Server;
  afterInit(server: Server) {
    console.log('Init start');
    this.socketService.socket = server;
    console.log('Init End');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
