import { describe, it, expect } from 'vitest';
import { MutationClient } from '../client/mutation.client.js';
import { mutationTestData } from '../data/testData.js';

describe('Mutation Client', () => {
  const mutationClient = new MutationClient();

  it('should create a new post', async () => {
    const newPost = await mutationClient.createPost(mutationTestData.newPost);
    expect(newPost).toBeDefined();
    expect(newPost.id).toBeDefined();
  });
});
