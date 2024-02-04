import { Container } from 'inversify';
import { CommentService } from './comment.service.js';
import { Component } from '../../types/component.enum.js';
import { CommentDocument, CommentModel } from './comment.model.js';
import { Model } from 'mongoose';

export function createCommentContainer() {
  const container = new Container();
  container.bind<CommentService>(Component.CommentService).to(CommentService).inSingletonScope();
  container.bind<Model<CommentDocument>>(Component.CommentModel).toConstantValue(CommentModel);
  return container;
}
