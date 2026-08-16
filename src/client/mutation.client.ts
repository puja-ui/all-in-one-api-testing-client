import axios, { type AxiosInstance } from 'axios';
import type { Post, CreatePostInput, GraphQLResponse } from '../interfaces/graphql.interface.js';
import { API_URLS } from '../data/urls.js';
import { GRAPHQL_QUERIES } from '../data/queries.js';

export class MutationClient {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: API_URLS.graphqlMutation,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async request<T>(query: string, variables: {}): Promise<T> {
    const response = await this.apiClient.post<GraphQLResponse<T>>('', {
      query,
      variables,
    });

    if (response.data.errors) {
      throw new Error(
        `GraphQL error: ${response.data.errors.map((e: any) => e.message).join(', ')}`,
      );
    }
    return response.data.data;
  }

  public async createPost(input: CreatePostInput): Promise<Post> {
    const response = await this.request<{ createPost: Post }>(GRAPHQL_QUERIES.createPost, {
      input,
    });
    return response.createPost;
  }
}
