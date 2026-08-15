import type { InternalAxiosRequestConfig } from 'axios';

export const githubAuthInterceptor = (config: InternalAxiosRequestConfig) => {
  if (process.env.GITHUB_ACCESS_TOKEN) {
    config.headers.Authorization = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`;
  }
  return config;
};
