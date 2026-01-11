import { Controller } from "@core/infra/Controller";
import { PrismaProfilesRepository } from "@modules/social/repositories/implementations/PrismaProfilesRepository";
import { UpdateProfile } from "@modules/social/useCases/UpdateProfile/UpdateProfile";
import { UpdateProfileController } from "@modules/social/useCases/UpdateProfile/UpdateProfileController";

export function makeUpdateProfileController(): Controller {
  const repository = new PrismaProfilesRepository();
  const useCase = new UpdateProfile(repository);
  const controller = new UpdateProfileController(useCase);

  return controller;
}