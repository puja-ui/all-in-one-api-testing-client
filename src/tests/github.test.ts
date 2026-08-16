import { describe, it, expect } from 'vitest';
import { GithubClient } from '../client/github.client.js';
// Importing this immediately runs the Zod validation! If the token is missing, the test file will crash immediately before any tests run.
import '../config/env.js';

describe('Github GraphQL Client', () => {
  const githubClient = new GithubClient();

  it('should fetch github profile if token exists', async () => {
    const response = await githubClient.getMyProfile();
    expect(response).toBeDefined();
    expect(response.login).toBeDefined();
  });

  it('should intentionally fail to demonstrate Qase reporting', () => {
    // This will definitely fail!
    expect(true).toBe(false);
  });
});
