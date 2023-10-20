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
  server: Socket;
  connections: { id: string; socket: Socket }[] = [];

  handleConnection(client: Socket) {
    console.log('New connection', client.id);
    this.connections.push({ id: client.id, socket: client });
    console.log(client.handshake.auth);
    this.server.emit(
      'updateconnections',
      this.connections.map((connection) => connection.id),
    );
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected', client.id);
    this.connections = this.connections.filter(
      (connection) => connection.id !== client.id,
    );
    this.server.emit(
      'updateconnections',
      this.connections.map((connection) => connection.id),
    );
  }

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('message', `${data}`);
    console.log(data);
    return data;
  }
}
