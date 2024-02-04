import { CreateCommentDto } from './DTO/create-comment.dto.js';
import { CommentDocument, CommentModel } from './comment.model.js';
import { ICommentService } from './comment.service.interface.js';

export class CommentService implements ICommentService {
  public async create(dto: CreateCommentDto): Promise<CommentDocument> {
    const comment = CommentModel.create(dto);
    return comment;
  }
}
