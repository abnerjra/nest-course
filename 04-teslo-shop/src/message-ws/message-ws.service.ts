import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Socket } from 'socket.io';

import { User } from 'src/auth/entities/user.entity';

interface ConnectedClient {
  [id: string]: {
    socket: Socket,
    user: User
  }
}

@Injectable()
export class MessageWsService {

  private connectedClient: ConnectedClient = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) throw new Error('User not found');
    if (!user.isActive) throw new Error('User not active');

    this.checkUserConnection(user);

    this.connectedClient[client.id] = { socket: client, user }
  }

  removeClient(clientId: string) {
    delete this.connectedClient[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClient);
  }

  getUserFullNameBySocket(socketId: string) {
    return this.connectedClient[socketId].user.fullName;
  }

  private checkUserConnection(user: User) {
    for (const clientId of Object.keys(this.connectedClient)) {
      const connectedClient = this.connectedClient[clientId];
      if (connectedClient.user.id === user.id) {
        connectedClient.socket.disconnect();
        break;
      }
    }
  }

}
