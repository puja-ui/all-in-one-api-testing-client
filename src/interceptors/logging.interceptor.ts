import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

export const loggingRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} to ${config.url}`);
  return config;
};

export const loggingRequestErrorInterceptor = (error: any) => {
  console.error(`[API Request Error] ${error}`);
  return Promise.reject(error);
};

export const loggingResponseInterceptor = (response: AxiosResponse) => {
  console.log(
    `[API Response] ${response.status} from ${response.config.method?.toUpperCase()} to ${response.config.url}`,
  );
  return response;
};

export const loggingResponseErrorInterceptor = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error(
      `[API response error] ${error.response?.status} from ${error.config?.method?.toUpperCase()} to ${error.config?.url}`,
    );
  } else {
    console.error(`[API response error] ${error}`);
  }
  return Promise.reject(error);
};
