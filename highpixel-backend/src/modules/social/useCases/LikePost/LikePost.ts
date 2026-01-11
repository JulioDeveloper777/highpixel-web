import { Either, left, right } from '@core/logic/Either';
import { Like } from '@modules/social/domain/timeline/Like';
import ILikesRepository from '@modules/social/repositories/ILikesRepository';
import { IPostsRepository } from '@modules/social/repositories/IPostsRepository';
import { LikePostAlreadyLiked } from '@modules/social/useCases/LikePost/errors/LikePostAlreadyLiked';
import { LikePostDoesNotExist } from '@modules/social/useCases/LikePost/errors/LikePostDoesNotExist';

type LikePostRequest = {
  postId: string;
  unlike: boolean;
  authorId: string;
};

type LikePostResponse = Either<
  LikePostDoesNotExist | LikePostAlreadyLiked,
  Like
>;

export class LikePost {
  constructor(
    private postsRepository: IPostsRepository,
    private likesRepository: ILikesRepository
  ) { }

  async execute({
    postId,
    unlike,
    authorId,
  }: LikePostRequest): Promise<LikePostResponse> {
    const exists = await this.postsRepository.exists(postId);

    if (!exists) {
      return left(new LikePostDoesNotExist());
    }

    const alreadyLiked = await this.likesRepository.exists(postId, authorId);
    const post = await this.postsRepository.findOne(postId);

    if (alreadyLiked) {
      if (unlike) {
        const like = await this.likesRepository.findOne(postId, authorId);
        post.deslike(like);

        await this.postsRepository.save(post);

        return right(like);
      }

      return left(new LikePostAlreadyLiked());
    }

    const like = Like.create({
      authorId: authorId,
      postId: postId,
    });

    post.like(like);

    await this.postsRepository.save(post);

    return right(like);
  }
}
