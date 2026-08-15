import { describe, it, expect } from 'vitest';
import { RestClient } from '../client/rest.client.js';
import { restTestData } from '../data/testData.js';

describe('REST Client', () => {
  const restClient = new RestClient();

  it('should fetch users and find specific user by ID', async () => {
    const response = await restClient.getUsers();
    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(0);
    const targetUser = response.find((u) => u.id === restTestData.userIdToFetch);
    expect(targetUser).toBeDefined();
    expect(targetUser?.id).toBe(restTestData.userIdToFetch);
  });

  it('should create a user with given data', async () => {
    const newUser = await restClient.createUser(restTestData.newUser);
    expect(newUser).toBeDefined();
    // JSONPlaceholder mock endpoint usually returns id=11
    expect(newUser.id).toBeDefined();
  });
});
