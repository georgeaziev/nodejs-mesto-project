export const tokenKey = "secret-jwt-key";

export enum StatuseCodes {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  ERROR = 500,
  DB_CONNECTION_ERR = 503,
}

export const requestObjectKeys = [
  "body",
  "cookies",
  "baseUrl",
  "complete",
  "headers",
  "hostName",
  "query",
  "fresh",
];
