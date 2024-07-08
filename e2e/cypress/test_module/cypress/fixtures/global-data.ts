export const mockData = {};

export const httpStatusCode = {
  forbidden: 403,
  gatewayTimeout: 504,
  internalServerError: 500,
  notFound: 404,
  ok: 200
} as const;

export const httpMethod = {
  get: "GET",
  post: "POST",
  put: "PUT"
} as const;

export const ROLES = {
  USER: "ROLE_USER",
  SHOP_MANAGER: "ROLE_SHOP_MANAGER",
  ADMIN: "ROLE_ADMIN"
} as const;
