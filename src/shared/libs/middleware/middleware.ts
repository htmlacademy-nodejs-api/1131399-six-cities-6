import { inject, injectable } from 'inversify';
import { isValidObjectId } from 'mongoose';
import vine from '@vinejs/vine';
import { Request, Response, NextFunction } from 'express';
import { IMiddlewares } from './middleware.interface.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../logger/index.js';
import { ILabel } from '../label/label.interface.js';
import { OfferIdValidationError } from '../errors/offerErrors.js';
import { UserIdValidationError } from '../errors/userErrors.js';
import { CommentIdValidationError } from '../errors/commentErrors.js';
import { CreateOfferDto } from '../../models/offer/DTO/create-offer.dto.js';
import { createCommentSchema, createOfferSchema, createUserSchema, updateCommentSchema, updateOfferSchema, updateUserSchema } from '../validation/index.js';
import { ValidationError } from '../errors/commonErrors.js';
import { UpdateOfferDto } from '../../models/offer/DTO/update-offer.dto.js';
import { CreateCommentDto, UpdateCommentDto } from '../../models/comment/DTO/create-comment.dto.js';
import { CreateUserDto } from '../../models/user/DTO/create-user.dto.js';
import { UpdateUserDto } from '../../models/user/DTO/update-user.dto.js';


@injectable()
export class Middlewares implements IMiddlewares {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Label) private readonly label: ILabel
  ){
    this.logger.info(this.label.get('error.middlewares.register'));
  }

  public checkOfferObjectID(request: Request, _response: Response, next: NextFunction) {
    const { params: { offerId } } = request;

    const idIsValid = isValidObjectId(offerId);

    if (idIsValid) {
      next();
      return;
    }
    throw new OfferIdValidationError();
  }

  public checkUserObjectID(request: Request, _response: Response, next: NextFunction) {
    const { params: { userId } } = request;
    const idIsValid = isValidObjectId(userId);
    if (idIsValid) {
      next();
      return;
    }
    throw new UserIdValidationError();
  }

  public checkCommentObjectID(request: Request, _response: Response, next: NextFunction) {
    const { params: { commentId } } = request;
    const idIsValid = isValidObjectId(commentId);
    if (idIsValid) {
      next();
      return;
    }
    throw new CommentIdValidationError();
  }

  public async validateCreateOfferDTO(request: Request, _response: Response, next: NextFunction) {
    const data = request.body as CreateOfferDto;
    try {
      await vine.validate({
        schema: createOfferSchema,
        data
      });
      return next();

    } catch(e) {
      if (e instanceof Error) {
        throw new ValidationError(e.message);
      }
    }

  }

  public async validateUpdateOfferDTO(request: Request, _response: Response, next: NextFunction) {
    const data = request.body as UpdateOfferDto;
    try {
      await vine.validate({
        schema: updateOfferSchema,
        data
      });
      return next();

    } catch(e) {
      if (e instanceof Error) {
        throw new ValidationError(e.message);
      }
    }
  }

  public async validateCreateCommentsDTO(request: Request, _response: Response, next: NextFunction) {
    const data = request.body as CreateCommentDto;
    try {
      await vine.validate({
        schema: createCommentSchema,
        data
      });
      return next();

    } catch(e) {
      if (e instanceof Error) {
        throw new ValidationError(e.message);
      }
    }
  }

  public async validateUpdateCommentsDTO(request: Request, _response: Response, next: NextFunction) {
    const data = request.body as UpdateCommentDto;
    try {
      await vine.validate({
        schema: updateCommentSchema,
        data
      });
      return next();

    } catch(e) {
      if (e instanceof Error) {
        throw new ValidationError(e.message);
      }
    }
  }

  public async validateCreateUserDTO(request: Request, _response: Response, next: NextFunction) {
    const data = request.body as CreateUserDto;
    try {
      await vine.validate({
        schema: createUserSchema,
        data
      });
      return next();

    } catch(e) {
      if (e instanceof Error) {
        throw new ValidationError(e.message);
      }
    }
  }

  public async validateUpdateUserDTO(request: Request, _response: Response, next: NextFunction) {
    const data = request.body as UpdateUserDto;
    try {
      await vine.validate({
        schema: updateUserSchema,
        data
      });
      return next();

    } catch(e) {
      if (e instanceof Error) {
        throw new ValidationError(e.message);
      }
    }
  }
}
