import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from './http-methods.enum.js';

export interface Route {
  path: string;
  method: HttpMethod;
  handler: (_request: Request, _response: Response, _next: NextFunction) => void;
}
