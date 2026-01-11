import { Controller } from '@core/infra/Controller';
import {
  clientError,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { Appointment } from '@modules/player/domain/Appointment';
import { AppointmentMapper } from '@modules/player/mappers/AppointmentMapper';
import { GetStaffAppointmentStaffNotExists } from '@modules/staff/useCases/GetStaffAppointments/errors/GetStaffAppointmentStaffNotExists';
import { GetStaffAppointment } from '@modules/staff/useCases/GetStaffAppointments/GetStaffAppointments';

type GetStaffAppointmentControllerRequest = {
  user: { id: string };
};

export class GetStaffAppointmentsController implements Controller {
  constructor(private getStaffAppointments: GetStaffAppointment) { }

  async handle({
    user,
  }: GetStaffAppointmentControllerRequest): Promise<HttpResponse> {
    const result = await this.getStaffAppointments.execute({
      user,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case GetStaffAppointmentStaffNotExists:
          return notFound(error);
        default:
          return clientError(error);
      }
    } else {
      const toPersistence = result.value.map((appointment: Appointment) =>
        AppointmentMapper.toPersistence(appointment)
      );

      return ok({
        data: toPersistence,

        totalCount: toPersistence.length,
      });
    }
  }
}
