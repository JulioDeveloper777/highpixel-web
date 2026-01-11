import { Controller } from "@core/infra/Controller";
import { PrismaFollowsRepository } from "@modules/social/repositories/implementations/PrismaFollowsRepository";
import { PrismaProfilesRepository } from "@modules/social/repositories/implementations/PrismaProfilesRepository";
import { SubscribeFollower } from "@modules/social/useCases/SubscribeFollower/SubscribeFollower";
import { SubscribeFollowerController } from "@modules/social/useCases/SubscribeFollower/SubscribeFollowerController";
import { SubscribeFollowerFindAll } from "@modules/social/useCases/SubscribeFollower/SubscribeFollowerFindAll";
import { SubscribeFollowerUnsubscribe } from "@modules/social/useCases/SubscribeFollower/SubscribeFollowUnFollow";

export function makeSubscribeFollowerController(): Controller {
  const followersRepository = new PrismaFollowsRepository();
  const profileRepository = new PrismaProfilesRepository(
    null,
    followersRepository
  );

  const useCase = new SubscribeFollower(followersRepository, profileRepository);
  const useCaseFindAll = new SubscribeFollowerFindAll(
    followersRepository,
    profileRepository
  );

  const useCaseUnfollow = new SubscribeFollowerUnsubscribe(
    followersRepository,
    profileRepository
  );

  const controller = new SubscribeFollowerController(
    useCase,
    useCaseFindAll,
    useCaseUnfollow
  );

  return controller;
}
