import { Controller } from '@core/infra/Controller';
import {
  clientError,
  fail,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { CreateWeekTimes } from '@modules/staff/useCases/CreateWeekTimes/CreateWeekTimes';
import { CreateWeekTimeInvalidRequest } from '@modules/staff/useCases/CreateWeekTimes/errors/CreateWeekTimeInvalidRequest';
import { CreateWeekTimesInvalidTimesLength } from '@modules/staff/useCases/CreateWeekTimes/errors/CreateWeekTimesInvalidTimesLength';
import { CreateWeekTimeStaffNotFound } from '@modules/staff/useCases/CreateWeekTimes/errors/CreateWeekTimeStaffNotFound';

type CreateWeekTimesControllerRequest = {
  id: string;
  times: any[];
};

export class CreateWeekTimesController implements Controller {
  constructor(private createWeekTimes: CreateWeekTimes) {}

  async handle({
    id,
    times,
  }: CreateWeekTimesControllerRequest): Promise<HttpResponse> {
    const result = await this.createWeekTimes.execute({ id, times });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CreateWeekTimeInvalidRequest:
          return clientError(error);
        case CreateWeekTimeStaffNotFound:
          return notFound(error);
        case CreateWeekTimesInvalidTimesLength:
          return clientError(error);
        default:
          return fail(error);
      }
    } else {
      return ok();
    }
  }
}
