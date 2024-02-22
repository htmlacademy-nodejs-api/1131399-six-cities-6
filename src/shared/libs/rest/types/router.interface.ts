import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from './http-methods.enum.js';

type Middleware = (_request: Request, _response: Response, _next: NextFunction) => void;
export interface Route {
  path: string;
  method?: HttpMethod;
  handler: (_request: Request, _response: Response, _next: NextFunction) => void;
  middlewares?: Middleware[];
}
