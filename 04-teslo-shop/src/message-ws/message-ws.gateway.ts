import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MessageWsService } from './message-ws.service';

@WebSocketGateway({ cors: true })
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wsServer: Server

  constructor(
    private readonly messageWsService: MessageWsService
  ) { }

  handleConnection(client: Socket) {
    // console.log('Client connected: ', client.id);
    this.messageWsService.registerClient(client);

    const clientsConnected = this.messageWsService.getConnectedClients();
    // console.log({ clientsConnected: clientsConnected });
    // emit -> enviar informacion al cliente
    this.wsServer.emit('clients-updated', clientsConnected);

  }

  handleDisconnect(client: Socket) {
    // console.log('Client disconnected: ', client.id);
    this.messageWsService.removeClient(client.id);
    // console.log({ clientsConnected: this.messageWsService.getConnectedClients() });
    const clientsConnected = this.messageWsService.getConnectedClients();
    // emit -> enviar informacion al cliente
    this.wsServer.emit('clients-updated', clientsConnected);
  }
}
