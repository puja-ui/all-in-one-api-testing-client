import axios, { type AxiosInstance } from 'axios';
import type { Country, GraphQLResponse } from '../interfaces/graphql.interface.js';
import { API_URLS } from '../data/urls.js';
import { GRAPHQL_QUERIES } from '../data/queries.js';

export class GraphQLClient {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: API_URLS.graphqlCountries,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async request<T>(query: string, variables: {}): Promise<T> {
    const response = await this.apiClient.post<GraphQLResponse<T>>('', {
      query: query,
      variables: variables,
    });

    if (response.data.errors) {
      throw new Error(
        `GraphQL error: ${response.data.errors?.map((e: any) => e.message).join(', ')}`
      );
    }
    return response.data.data;
  }

  public async getCountries(countriesCode: String[]): Promise<Country[]> {
    const response = await this.request<{ countries: Country[] }>(
      GRAPHQL_QUERIES.getCountries,
      { codes: countriesCode }
    );
    return response.countries;
  }
}
