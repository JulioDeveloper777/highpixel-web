import { Controller } from "@core/infra/Controller";
import { PrismaPostsRepository } from "@modules/social/repositories/implementations/PrismaPostsRepository";
import { PrismaProfilesRepository } from "@modules/social/repositories/implementations/PrismaProfilesRepository";
import { SearchPosts } from "@modules/social/useCases/SearchPosts/SearchPosts";
import { SearchPostsController } from "@modules/social/useCases/SearchPosts/SearchPostsController";

export function makeSearchPostsController(): Controller {
  const repository = new PrismaPostsRepository();
  const profilesRepository = new PrismaProfilesRepository();
  const useCase = new SearchPosts(repository, profilesRepository);
  const controller = new SearchPostsController(useCase);

  return controller;
}
