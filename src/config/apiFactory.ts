import axios, { AxiosInstance } from 'axios';
import { setupInterceptors } from './axios.interceptor';
import { createApi } from './baseApi';
import { serviceUrls, ServiceName } from './serviceUrls';

const apiCache: Partial<Record<ServiceName, AxiosInstance>> = {};
const instances: Record<string, AxiosInstance> = {};

export function getApi(service: ServiceName): AxiosInstance {
  if (apiCache[service]) return apiCache[service]!;
  const baseURL = serviceUrls[service];
  const instance = createApi(baseURL);
  setupInterceptors(instance);
  apiCache[service] = instance;
  return instance;
}

export function resetApi(service?: ServiceName) {
  if (service) {
    delete apiCache[service];
  } else {
    Object.keys(apiCache).forEach(k => delete apiCache[k as ServiceName]);
  }
}
