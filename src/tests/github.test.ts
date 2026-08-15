import 'dotenv/config';
import { describe, it, expect } from 'vitest';
import { GithubClient } from '../client/github.client.js';

describe('Github GraphQL Client', () => {
  const githubClient = new GithubClient();

  it('should fetch github profile if token exists', async () => {
    if (!process.env.GITHUB_ACCESS_TOKEN) {
      throw new Error('Test failed: GITHUB_ACCESS_TOKEN is not defined in environment variables');
    }

    const response = await githubClient.getMyProfile();
    expect(response).toBeDefined();
    expect(response.login).toBeDefined();
  });
});
