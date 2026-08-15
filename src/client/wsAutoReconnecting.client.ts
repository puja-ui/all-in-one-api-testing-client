import { WebSocket } from 'ws';
import type { chatMessage } from '../interfaces/websocket.interface.js';
import { API_URLS } from '../data/urls.js';

export class AutoReconnectingWebsocket {
  private url: string;
  private newSocket: WebSocket | null = null;
  private shouldReconnect: boolean = true;
  private reconnectInterval: number = 3000; // 3 seconds

  constructor(url: string = API_URLS.websocketEcho) {
    this.url = url;
  }

  public connect() {
    console.log(`Attempting to connect to WebSocket server at ${this.url}...`);
    this.newSocket = new WebSocket(this.url);

    this.newSocket.onopen = () => {
      console.log('Websocket connection established');
    };

    this.newSocket.onmessage = (event) => {
      if (
        typeof event.data === 'string' &&
        event.data.startsWith('Request served')
      ) {
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

    this.newSocket.onerror = (error) => {
      console.log(`Websocket error: ${error}`);
    };

    this.newSocket.onclose = (event) => {
      console.log(`WebSocket connection closed: ${event.code} - ${event.reason}`);

      if (this.shouldReconnect) {
        console.log(
          `Unexpected closure, attempting to reconnect in ${
            this.reconnectInterval / 1000
          } seconds...`
        );
        setTimeout(() => this.connect(), this.reconnectInterval);
      } else {
        console.log('Websocket manual disconnect complete. Shutting down.');
      }
    };
  }

  public sendMessage(data: chatMessage) {
    if (this.newSocket && this.newSocket.readyState === WebSocket.OPEN) {
      this.newSocket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  }

  public disconnect() {
    this.shouldReconnect = false;
    if (this.newSocket) {
      this.newSocket.close(1000, 'Normal closure');
    }
  }

  public forceStop() {
    if (this.newSocket) {
      this.newSocket.close(1000, 'Force stop simulated');
    }
  }
}
