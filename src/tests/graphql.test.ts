import { describe, it, expect } from 'vitest';
import { GraphQLClient } from '../client/graphql.client.js';
import { graphqlTestData } from '../data/testData.js';

describe('GraphQL Client', () => {
  const graphqlClient = new GraphQLClient();

  it('should fetch countries', async () => {
    const response = await graphqlClient.getCountries(graphqlTestData.countriesToFetch);
    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
    const firstCountry = response[0];
    expect(firstCountry).toBeDefined();
    expect(firstCountry?.name).toBeDefined();
    expect(firstCountry?.emoji).toBeDefined();
  });
});
