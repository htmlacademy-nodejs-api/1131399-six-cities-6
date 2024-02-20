import { inject, injectable } from 'inversify';
import { CreateCommentDto } from './DTO/create-comment.dto.js';
import { CommentDocument } from './comment.model.js';
import { ICommentService } from './comment.service.interface.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { ILabel } from '../../libs/label/label.interface.js';
import { Model } from 'mongoose';

@injectable()
export class CommentService implements ICommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Label) private readonly label: ILabel,
    @inject(Component.CommentModel) private readonly commentModel: Model<CommentDocument>
  ){}

  public async createComment(dto: CreateCommentDto): Promise<CommentDocument> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`${this.label.get('comment.created')}: ${comment.id}`);
    return comment;
  }
}
