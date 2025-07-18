import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <input id="jwt-client" placeholder="Token client...">
    <button id="btn-connect">Connect</button>

    <br/>
    <span id='server-status'>offline</span>
    <ol id="clients-ul"></ol>

    <form id="message-form">
      <input placeholder="message..." id="message-input">
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer();

const jwtClient = document.querySelector<HTMLInputElement>('#jwt-client')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (jwtClient.value.trim().length <= 0) return alert('Enter a valid JWT');
  connectToServer(jwtClient.value.trim());
});