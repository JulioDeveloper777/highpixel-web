import { Controller } from '@core/infra/Controller';
import { HttpResponse, ok } from '@core/infra/HttpResponse';
import DeleteTimelineSuggestion from './DeleteTimelineSuggestion';

type Request = { params: { id: string } };

export class DeleteTimelineSuggestionController implements Controller {
  constructor(private del: DeleteTimelineSuggestion) { }

  async handle({ params }: Request): Promise<HttpResponse> {
    await this.del.execute({ id: params.id });
    return ok(true);
  }
}

export default DeleteTimelineSuggestionController;
