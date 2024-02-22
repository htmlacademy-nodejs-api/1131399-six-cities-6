import { NextFunction, Request, Response } from 'express';


export interface IMiddlewares {
  checkOfferObjectID(request: Request, response: Response, next: NextFunction): void;
  checkUserObjectID(request: Request, response: Response, next: NextFunction): void;
  checkCommentObjectID(request: Request, response: Response, next: NextFunction): void;
  validateCreateOfferDTO(request: Request, response: Response, next: NextFunction): void;
  validateUpdateOfferDTO(request: Request, response: Response, next: NextFunction): void;
  validateCreateCommentsDTO(request: Request, response: Response, next: NextFunction): void;
  validateUpdateCommentsDTO(request: Request, response: Response, next: NextFunction): void;
  validateCreateUserDTO(request: Request, response: Response, next: NextFunction): void;
  validateUpdateUserDTO(request: Request, response: Response, next: NextFunction): void;
}
