import { AxiosInstance } from 'axios';
import { createApi } from './baseApi';
import { serviceUrls, ServiceName } from './serviceUrls';

const apiCache: Partial<Record<ServiceName, AxiosInstance>> = {};

export function getApi(service: ServiceName): AxiosInstance {
  if (apiCache[service]) return apiCache[service]!;
  const baseURL = serviceUrls[service];
  const instance = createApi(baseURL);
  apiCache[service] = instance;
  return instance;
}

// util: forçar atualização (útil em testes ou troca dinâmica)
export function resetApi(service?: ServiceName) {
  if (service) {
    delete apiCache[service];
  } else {
    Object.keys(apiCache).forEach(k => delete apiCache[k as ServiceName]);
  }
}
