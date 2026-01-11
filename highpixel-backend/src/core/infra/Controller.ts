import { HttpResponse } from '@core/infra/HttpResponse';

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>;
}
