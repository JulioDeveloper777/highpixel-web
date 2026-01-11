import { Controller } from "@core/infra/Controller";
import { HttpResponse, ok } from "@core/infra/HttpResponse";
import DeleteTrendingChannel from "./DeleteTrendingChannel";

type Request = { params: { id: string } };

export class DeleteTrendingChannelController implements Controller {
  constructor(private deleteTrending: DeleteTrendingChannel) { }

  async handle({ params }: Request): Promise<HttpResponse> {
    await this.deleteTrending.execute({ id: params.id });
    return ok(true);
  }
}

export default DeleteTrendingChannelController;
