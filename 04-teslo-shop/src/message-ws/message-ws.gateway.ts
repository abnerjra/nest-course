import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from 'src/auth/interfaces';

import { MessageWsService } from './message-ws.service';
import { NewMessageDto } from './dtos';

@WebSocketGateway({ cors: true })
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wsServer: Server

  constructor(
    private readonly messageWsService: MessageWsService,
    private readonly jwtService: JwtService
  ) { }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.messageWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    // emit -> enviar informacion al cliente
    this.wsServer.emit('clients-updated', this.messageWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    // console.log('Client disconnected: ', client.id);
    this.messageWsService.removeClient(client.id);
    // console.log({ clientsConnected: this.messageWsService.getConnectedClients() });
    // emit -> enviar informacion al cliente
    this.wsServer.emit('clients-updated', this.messageWsService.getConnectedClients());
  }

  //* Escuchar eventos del cliente
  // message-client
  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    //! Emite únicamente al cliente emisor
    // client.emit('message-from-server', ({
    //   fullName: 'Soy yo !!!',
    //   message: payload.message
    // }))

    //! Emitir a todos los clientes, incluyendo al cliente emisor
    // this.wsServer.emit('message-from-server', ({
    //   fullName: 'Soy yo !!!',
    //   message: payload.message
    // }))

    //! Emitir a todos los clientes, excepto al cliente emisor
    client.broadcast.emit('message-from-server', ({
      fullName: this.messageWsService.getUserFullNameBySocket(client.id),
      message: payload.message
    }))
  }

}
