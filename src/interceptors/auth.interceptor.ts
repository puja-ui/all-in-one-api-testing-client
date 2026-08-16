import type { InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env.js';

export const githubAuthInterceptor = (config: InternalAxiosRequestConfig) => {
  // Zod already validated this, so we are 100% sure it exists and is a string!
  config.headers.Authorization = `Bearer ${env.GH_ACCESS_TOKEN}`;
  return config;
};
