import { Controller } from "@core/infra/Controller";
import { fail, HttpResponse, ok } from "@core/infra/HttpResponse";
import CreateTrendingChannel from "./CreateTrendingChannel";

type Request = {
  user?: { id: string };
  body: { name: string; subtitle?: string; thumbnail?: string; badge?: string };
};

export class CreateTrendingChannelController implements Controller {
  constructor(private createTrending: CreateTrendingChannel) { }

  async handle({ user, body }: Request): Promise<HttpResponse> {
    const result = await this.createTrending.execute({
      name: body.name,
      subtitle: body.subtitle,
      thumbnail: body.thumbnail,
      badge: body.badge,
      userId: user?.id,
    });

    if (result.isLeft()) return fail(result.value);

    return ok(result.value);
  }
}

export default CreateTrendingChannelController;
