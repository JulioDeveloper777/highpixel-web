import { Controller } from "@core/infra/Controller";
import { PrismaPostsRepository } from "@modules/social/repositories/implementations/PrismaPostsRepository";
import { CreatePost } from "@modules/social/useCases/CreatePost/CreatePost";
import { CreatePostController } from "@modules/social/useCases/CreatePost/CreatePostController";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";

export function makeCreatePostController(): Controller {
  const usersRepository = new PrismaUserRepository();
  const postsRepository = new PrismaPostsRepository();
  const useCase = new CreatePost(usersRepository, postsRepository);
  const controller = new CreatePostController(useCase);

  return controller;
}