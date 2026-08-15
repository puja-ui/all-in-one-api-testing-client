import { describe, it, expect } from 'vitest';
import { AutoReconnectingWebsocket } from '../client/wsAutoReconnecting.client.js';

describe('Auto Reconnecting Websocket', () => {
  it('should connect and disconnect without throwing errors', async () => {
    const chatClient = new AutoReconnectingWebsocket();

    chatClient.connect();
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    expect(() => chatClient.sendMessage({ user: 'Test', action: 'sent', message: 'Hello' })).not.toThrow();

    chatClient.disconnect();
  });
});
