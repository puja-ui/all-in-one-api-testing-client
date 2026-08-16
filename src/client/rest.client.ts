import axios, { type AxiosInstance } from 'axios';
import type { User, userPayload } from '../interfaces/rest.interface.js';
import {
  loggingRequestInterceptor,
  loggingRequestErrorInterceptor,
  loggingResponseInterceptor,
  loggingResponseErrorInterceptor,
} from '../interceptors/logging.interceptor.js';
import { API_URLS } from '../data/urls.js';

export class RestClient {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: API_URLS.rest,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.apiClient.interceptors.request.use(
      loggingRequestInterceptor,
      loggingRequestErrorInterceptor,
    );

    this.apiClient.interceptors.response.use(
      loggingResponseInterceptor,
      loggingResponseErrorInterceptor,
    );
  }

  public async getUsers(): Promise<User[]> {
    const response = await this.apiClient.get<User[]>('/users');
    return response.data;
  }

  public async createUser(payload: userPayload): Promise<User> {
    const response = await this.apiClient.post<User>('/users', payload);
    return response.data;
  }
}
