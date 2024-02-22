import { NextFunction, Request, Response } from 'express';


export interface IBaseExceptionHandler {
  catch(error: Error, reques: Request, response: Response, next: NextFunction): void;
}
