import { CloudinaryUploadService } from "@infra/services/cloudinary/CloudinaryStorage";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { uploadConfig } from "@config/upload-config";
import { Either, left, right } from "@core/logic/Either";
import { Content } from "@modules/social/domain/timeline/Content";
import { Post } from "@modules/social/domain/timeline/Post";
import { IPostsRepository } from "@modules/social/repositories/IPostsRepository";
import { InvalidPostContentLength } from "@modules/social/useCases/CreatePost/errors/InvalidPostContentLength";
import { InvalidPostUserNotFound } from "@modules/social/useCases/CreatePost/errors/InvalidPostUserNotFound";
import { PostErrorInCreate } from "@modules/social/domain/timeline/errors/PostErrorInCreate";
import { emitter } from '@infra/events/emitter';

type CreatePostRequest = {
  content: string;
  file?: Express.Multer.File;
  authorId: string;
};

type FileResponse = {
  file: string;
};

type CreatePostResponse = Either<
  InvalidPostContentLength | InvalidPostUserNotFound,
  Post
>;


export class CreatePost {
  constructor(
    private usersRepository: IUserRepository,
    private postsRepository: IPostsRepository
  ) { }

  async execute({
    content,
    file,
    authorId,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const uploadService = new CloudinaryUploadService();

    const contentOrError = Content.create(content);

   if (contentOrError.isLeft()) {
      return left(new InvalidPostContentLength());
    }
    const user = await this.usersRepository.findOne(authorId);
    if (!user) {
      return left(new InvalidPostUserNotFound());
    }

    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const isValidBase64 = base64.startsWith(`data:${file.mimetype};base64,`);

    if (!isValidBase64) {
      throw new Error("Formato base64 inválido ou tipo MIME não suportado.");
    }


    const userMimeTypes = user.isPremium
      ? uploadConfig.post.mimeTypes.premium
      : uploadConfig.post.mimeTypes.default;

    const userLimits = user.isPremium
      ? uploadConfig.post.limits.premium
      : uploadConfig.post.limits.default;

    // Verifique se o tipo de arquivo é permitido
    if (!userMimeTypes[file.mimetype]) {
      throw new Error(`Tipo de arquivo não permitido: ${file.mimetype}`);
    }

    // Verifique se o tamanho do arquivo está dentro do limite permitido
    const maxSize = userLimits[file.mimetype];
    if (!maxSize || file.size > maxSize) {
      throw new Error(`Arquivo excede o limite permitido (${maxSize / (1024 * 1024)} MB).`);
    }


    try {
      const upload = await uploadService.uploadPost(file)

      const postOrError = Post.create({
        authorId: user.id,
        content: contentOrError.value.value,
        asset: upload.url,
      });

      if (postOrError.isLeft()) {
        return left(postOrError.value);
      }

      const post = postOrError.value;
      post.setAsset = upload.url;

      await this.postsRepository.create(post);

      // Emit realtime event for new post
      try {
        emitter.emit('posts:new', {
          id: post.id,
          authorId: post.authorId,
          content: post.content,
          asset: post.asset,
          createdAt: post.createdAt,
          Likes: [],
          Comments: [],
        });
      } catch (err) {
        // swallow emitter errors
      }

      return right(post);
    } catch (error) {
      console.log(error);
      return left(new PostErrorInCreate());
    }
  }
}