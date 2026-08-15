import axios, { type AxiosInstance } from 'axios';
import 'dotenv/config';
import type { GithubViewer, GraphQLResponse } from '../interfaces/graphql.interface.js';
import { githubAuthInterceptor } from '../interceptors/auth.interceptor.js';
import { API_URLS } from '../data/urls.js';
import { GRAPHQL_QUERIES } from '../data/queries.js';

export class GithubClient {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: API_URLS.githubGraphQL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.apiClient.interceptors.request.use(githubAuthInterceptor);
  }

  private async request<T>(query: string, variables: {}): Promise<T> {
    const response = await this.apiClient.post<GraphQLResponse<T>>('', {
      query: query,
      variables: variables,
    });

    if (response.data.errors) {
      throw new Error(
        `GraphQL error: ${response.data.errors.map((e: any) => e.message).join(', ')}`
      );
    }

    return response.data.data;
  }

  public async getMyProfile(): Promise<GithubViewer> {
    const response = await this.request<{ viewer: GithubViewer }>(
      GRAPHQL_QUERIES.getMyProfile,
      {}
    );
    return response.viewer;
  }
}
