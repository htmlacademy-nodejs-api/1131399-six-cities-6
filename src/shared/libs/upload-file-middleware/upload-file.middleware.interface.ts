import { NextFunction, Request, Response } from 'express';


export interface IUploadFileMiddleware {
  execute(request: Request, response: Response, next: NextFunction): Promise<void>;
}
