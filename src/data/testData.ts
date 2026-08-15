import type { userPayload } from '../interfaces/rest.interface';
import type { CreatePostInput } from '../interfaces/graphql.interface';
import type { chatMessage } from '../interfaces/websocket.interface';

export const restTestData = {
  userIdToFetch: 1,
  newUser: {
    name: 'Joe1',
    mail: 'joe1@randommail.com',
  } as userPayload,
};

export const graphqlTestData = {
  countriesToFetch: ['IN', 'US', 'JP', 'BR'],
};

export const mutationTestData = {
  newPost: {
    title: 'Hello from the other side',
    body: 'omfg lol',
  } as CreatePostInput,
};

export const websocketTestData = {
  initialMessage: {
    user: 'Paul',
    action: 'sent',
    message: 'ello there mate!',
  } as chatMessage,
};

export const wsAutoReconnectingTestData = {
  initialMessage: {
    user: 'Paul',
    action: 'sent',
    message: 'Hello there mate!',
  } as chatMessage,
  reconnectMessage: {
    user: 'Paul',
    action: 'sent',
    message: 'Hello again after reconnect!',
  } as chatMessage,
};
