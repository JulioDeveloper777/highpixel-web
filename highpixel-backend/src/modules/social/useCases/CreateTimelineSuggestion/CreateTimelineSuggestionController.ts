import { Controller } from '@core/infra/Controller';
import { fail, HttpResponse, ok } from '@core/infra/HttpResponse';
import CreateTimelineSuggestion from './CreateTimelineSuggestion';

type Request = { user?: { id: string }; body: { name: string; username?: string; avatar?: string; subtitle?: string; badges?: string } };

export class CreateTimelineSuggestionController implements Controller {
  constructor(private create: CreateTimelineSuggestion) { }

  async handle({ user, body }: Request): Promise<HttpResponse> {
    try {
      const res = await this.create.execute({
        name: body.name,
        username: body.username,
        avatar: body.avatar,
        subtitle: body.subtitle,
        badges: body.badges,
        userId: user?.id,
      });

      if (res.isLeft()) return fail(res.value as Error);

      return ok(res.value);
    } catch (error) {
      return fail(error as Error);
    }
  }
}

export default CreateTimelineSuggestionController;
