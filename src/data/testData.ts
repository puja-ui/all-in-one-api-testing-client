import type { userPayload } from '../interfaces/rest.interface.js';
import type { CreatePostInput } from '../interfaces/graphql.interface.js';
import type { chatMessage } from '../interfaces/websocket.interface.js';
import { faker } from '@faker-js/faker';

export const restTestData = {
  userIdToFetch: 1,
  newUser: {
    name: faker.person.fullName(),
    mail: faker.internet.email(),
  } as userPayload,
};

export const graphqlTestData = {
  countriesToFetch: ['IN', 'US', 'JP', 'BR'],
};

export const mutationTestData = {
  newPost: {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
  } as CreatePostInput,
};

export const websocketTestData = {
  initialMessage: {
    user: faker.person.firstName(),
    action: 'sent',
    message: faker.lorem.sentence(),
  } as chatMessage,
};

export const wsAutoReconnectingTestData = {
  initialMessage: {
    user: faker.person.firstName(),
    action: 'sent',
    message: faker.lorem.sentence(),
  } as chatMessage,
  reconnectMessage: {
    user: faker.person.firstName(),
    action: 'sent',
    message: faker.lorem.sentence(),
  } as chatMessage,
};
