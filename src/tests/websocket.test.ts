import { describe, it, expect } from 'vitest';
import { SimpleWebsocketClient } from '../client/websocket.client.js';
import { websocketTestData } from '../data/testData.js';

describe('Simple Websocket', () => {
  it('should connect, send, and receive a message', async () => {
    const wsClient = new SimpleWebsocketClient();
    const socket = wsClient.connect();

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        socket.close();
        reject(new Error('WebSocket timeout'));
      }, 5000);

      const originalOnOpen = socket.onopen;
      socket.onopen = (event) => {
        if (originalOnOpen) originalOnOpen.call(socket, event);
        socket.send(JSON.stringify(websocketTestData.initialMessage));
      };

      const originalOnMessage = socket.onmessage;
      socket.onmessage = (event) => {
        if (originalOnMessage) originalOnMessage.call(socket, event);
        
        if (typeof event.data === 'string' && event.data.startsWith('Request served')) {
          return;
        }

        try {
          const parsedMessage = JSON.parse(event.data.toString());
          if (parsedMessage.user === websocketTestData.initialMessage.user) {
            expect(parsedMessage.message).toBe(websocketTestData.initialMessage.message);
            clearTimeout(timeout);
            socket.close(1000, 'Normal closure');
            resolve();
          }
        } catch (e) {
            // Ignore other messages
        }
      };
    });
  });
});
