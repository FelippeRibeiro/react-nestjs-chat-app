import { Injectable } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebsocketService implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;
  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);
    return data;
  }
  handleConnection(client: Socket) {
    console.log('New connection', client.id);
  }
  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected', client.id);
  }
}
