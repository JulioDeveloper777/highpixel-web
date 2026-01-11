import { Controller } from "@core/infra/Controller";
import { PrismaProfilesRepository } from "@modules/social/repositories/implementations/PrismaProfilesRepository";
import { ContentAvatar } from "@modules/social/useCases/Content/Avatar";
import { ContentBanner } from "@modules/social/useCases/Content/Banner";
import { ContentController } from "@modules/social/useCases/Content/ContentController";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";

export function makeContentController(): Controller {
  const profileRepository = new PrismaProfilesRepository();
  const userRepository = new PrismaUserRepository();
  const contentBanner = new ContentBanner(userRepository, profileRepository);
  const contentAvatar = new ContentAvatar(userRepository, profileRepository);
  const controller = new ContentController(contentAvatar, contentBanner);

  return controller;
}