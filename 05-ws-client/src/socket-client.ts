import { Manager, Socket } from "socket.io-client";

export const connectToServer = () => {

  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

  const socket = manager.socket('/');
  // console.log({ socket });


  addListener(socket);
}

const addListener = (socket: Socket) => {
  const serverStatusLabel = document.querySelector('#server-status');

  // Escuchar el servidor
  socket.on('connect', () => {
    serverStatusLabel!.innerHTML = 'Online';
  });

  socket.on('disconnect', () => {
    serverStatusLabel!.innerHTML = 'Offline';
  });

  // Emitir un evento al servidor
  // socket.emit();
}