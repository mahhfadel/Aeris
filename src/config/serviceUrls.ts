export const serviceUrls = {
  auth: import.meta.env.VITE_API_AUTH_URL,
  user: import.meta.env.VITE_API_USER_URL,
  search: import.meta.env.VITE_API_SEARCH_URL,
} as const;

export type ServiceName = keyof typeof serviceUrls;
