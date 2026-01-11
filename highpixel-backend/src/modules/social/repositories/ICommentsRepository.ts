import { Comments } from '@modules/social/domain/timeline/Comments';

export default interface ICommentsRepository {
  create(comments: Comments): Promise<void>;
  save(comments: Comments): Promise<void>;
}
