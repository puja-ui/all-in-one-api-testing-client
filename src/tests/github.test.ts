import 'dotenv/config';
import { describe, it, expect } from 'vitest';
import { GithubClient } from '../client/github.client.js';

describe('Github GraphQL Client', () => {
  const githubClient = new GithubClient();

  it('should fetch github profile if token exists', async () => {
    if (!process.env.GH_ACCESS_TOKEN) {
      throw new Error('Test failed: GH_ACCESS_TOKEN is not defined in environment variables');
    }

    const response = await githubClient.getMyProfile();
    expect(response).toBeDefined();
    expect(response.login).toBeDefined();
  });

  it('should intentionally fail to demonstrate Qase reporting', () => {
    // This will definitely fail!
    expect(true).toBe(false);
  });
});
