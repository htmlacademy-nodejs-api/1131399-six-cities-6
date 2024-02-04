import { CreateCommentDto } from './DTO/create-comment.dto.js';
import { CommentDocument } from './comment.model.js';

export interface ICommentService {
  create(dto: CreateCommentDto, salt: string): Promise<CommentDocument>
}
