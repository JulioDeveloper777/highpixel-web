import { Controller } from "@core/infra/Controller";
import { PrismaCommentRepository } from "@modules/social/repositories/implementations/PrismaCommentsRepository";
import { PrismaPostsRepository } from "@modules/social/repositories/implementations/PrismaPostsRepository";
import { CreateComment } from "@modules/social/useCases/CreateComment/CreateComment";
import { CreateCommentController } from "@modules/social/useCases/CreateComment/CreateCommentController";

export function makeCreateComment(): Controller {
  const createCommentRepo = new PrismaCommentRepository();
  const repository = new PrismaPostsRepository(null, createCommentRepo);
  const useCase = new CreateComment(repository);
  const controller = new CreateCommentController(useCase);

  return controller;
}