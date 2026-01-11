import { Like } from '@modules/social/domain/timeline/Like';
import { Likes } from '@modules/social/domain/timeline/Likes';

export default interface ILikesRepository {
  exists(postId: string, authorId: string): Promise<boolean>;
  findOne(postId: string, authorId: string): Promise<Like>;
  create(likes: Likes): Promise<void>;
  save(likes: Likes): Promise<void>;
}
