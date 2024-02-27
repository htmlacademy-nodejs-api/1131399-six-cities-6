import { CustomError } from './customError.js';
import { StatusCodes } from 'http-status-codes';

export class CreateOfferError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.createOffer');
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export class GetOfferError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.getOffer');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class GetAllOffersError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.getAllOffers');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class GetCommentsOnOfferError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.getCommentsOnOffer');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class GetPremiumOffersOnTheScopeError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.getPremiumOffersOnTheScope');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class GetSelectedFieldOnOfferError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.getSelectedFieldOnOfferError');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class CreateCommentOnOfferError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.createCommentOnOffer');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class UpdateOfferError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.updateOffer');
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export class PatchOfferError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.patchOffer');
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export class DeleteOfferError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.deleteOffer');
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export class OfferIdValidationError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.offer.idInvalid');
    this.code = StatusCodes.NOT_ACCEPTABLE;
  }
}
