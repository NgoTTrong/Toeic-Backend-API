import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { User } from '@prisma/client';

import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';
import { SocketService } from 'src/core/socket/socket.service';

@WebSocketGateway({
  cors: {
    origin: [
      'localhost:3000',
      'localhost:3001',
      'localhost:2999',
      'toeic-mastery-rho.vercel.app',
    ],
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
    this.socketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
