import { WebSocket } from 'ws';
import type { chatMessage } from '../interfaces/websocket.interface.js';
import { API_URLS } from '../data/urls.js';

export class SimpleWebsocketClient {
  public connect(): WebSocket {
    console.log(`Connecting to WebSocket server at ${API_URLS.websocketEcho}...`);

    const theSocket = new WebSocket(API_URLS.websocketEcho);

    theSocket.onopen = () => {
      console.log('connection established');
    };

    theSocket.onmessage = (event) => {
      if (typeof event.data === 'string' && event.data.startsWith('Request served')) {
        return;
      }
      try {
        const parsedMessage: chatMessage = JSON.parse(event.data.toString());
        console.log(
          `Received chat message from ${parsedMessage.user}: ${parsedMessage.action} - ${parsedMessage.message}`
        );
      } catch (error) {
        console.log(`Received message: ${event.data}`);
        console.error(`Error parsing message: ${error}`);
      }
    };

    theSocket.onerror = (error) => {
      console.log(`Websocket error: ${error}`);
    };

    theSocket.onclose = (event) => {
      console.log(`WebSocket connection closed: ${event.code} - ${event.reason}`);
    };

    return theSocket;
  }
}
