import { UnauthorizedError } from '@/presentation/errors';
import { ServerError } from './errors/server-error';
import type { IHttpResponse } from './protocols/http';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error,
});

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack as string).serializeErrors(),
});

export const success = <T = unknown>(data: T): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = <T = unknown>(data: T): IHttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null,
});

export const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError().serializeErrors(),
});
