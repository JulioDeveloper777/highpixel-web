import { Either, left, right } from '@core/logic/Either';
import { IAppointmentsRepository } from '@modules/player/repositories/IAppointmentsRepository';
import { IStaffReposiotry } from '@modules/staff/repositories/IStaffRepository';
import { GetStaffAppointmentStaffNotExists } from '@modules/staff/useCases/GetStaffAppointments/errors/GetStaffAppointmentStaffNotExists';

type GetStaffAppointmentRequest = {
  user: { id: string };
};

type GetStaffAppointmentResponse = Either<
  GetStaffAppointmentStaffNotExists,
  any
>;

export class GetStaffAppointment {
  constructor(
    private staffRepository: IStaffReposiotry,
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  async execute({
    user,
  }: GetStaffAppointmentRequest): Promise<GetStaffAppointmentResponse> {
    const staff = await this.staffRepository.findByUserID(user.id);

    if (!staff) {
      return left(new GetStaffAppointmentStaffNotExists());
    }

    const appointments = await this.appointmentsRepository.findByStaff(
      staff.id
    );

    return right(appointments);
  }
}
