import { Controller } from "@core/infra/Controller";
import { HttpResponse, ok } from "@core/infra/HttpResponse";
import ListTrendingChannels from "./ListTrendingChannels";

type Request = {};

export class ListTrendingChannelsController implements Controller {
  constructor(private listTrending: ListTrendingChannels) { }

  async handle(_req: Request): Promise<HttpResponse> {
    const channels = await this.listTrending.execute();
    return ok(channels);
  }
}

export default ListTrendingChannelsController;
