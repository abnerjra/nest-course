import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>
    <span id='server-status'>offline</span>
    <ol id="clients-ul"></ol>

    <form id="message-form">
      <input placeholder="message..." id="message-input">
    </form>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
connectToServer();