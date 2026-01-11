import { Controller } from '@core/infra/Controller';
import {
  clientError,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { ChangeAppointmentStatus } from '@modules/staff/useCases/ChangeAppointmentStatus/ChangeAppointmentStatus';
import { AppointmentNotExists } from '@modules/staff/useCases/ChangeAppointmentStatus/errors/AppointmentNotExists';
import { AppointmentStaffNotExists } from '@modules/staff/useCases/ChangeAppointmentStatus/errors/AppointmentStaffNotExists';

type ChangeAppointmentStatusControllerRequest = {
  user: { id: string };
  appointmentId: string;
  action: string;
};

export class ChangeAppointmentStatusController implements Controller {
  constructor(private CheckInAppointment: ChangeAppointmentStatus) {}

  async handle({
    user,
    appointmentId,
    action,
  }: ChangeAppointmentStatusControllerRequest): Promise<HttpResponse> {
    const result = await this.CheckInAppointment.execute({
      user,
      appointmentId,
      action,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case AppointmentStaffNotExists:
          return notFound(error);
        case AppointmentNotExists:
          return notFound(error);
        default:
          return clientError(error);
      }
    } else {
      return ok();
    }
  }
}
