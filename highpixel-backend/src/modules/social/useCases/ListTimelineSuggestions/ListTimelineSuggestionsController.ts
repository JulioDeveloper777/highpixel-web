import { Controller } from '@core/infra/Controller';
import { HttpResponse, ok } from '@core/infra/HttpResponse';
import ListTimelineSuggestions from './ListTimelineSuggestions';

export class ListTimelineSuggestionsController implements Controller {
  constructor(private list: ListTimelineSuggestions) { }

  async handle(): Promise<HttpResponse> {
    const items = await this.list.execute();
    return ok(items);
  }
}

export default ListTimelineSuggestionsController;
