import { Either, left, right } from '@core/logic/Either';
import * as Discord from '@infra/services/discord';
import { ITokensRepository } from '@modules/accounts/repositories/ITokensRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { ServiceTokenAlreadyUsed } from '@modules/accounts/useCases/ActivateUser/errors/ServiceTokenAlreadyUsed';
import { ServiceTokenExpired } from '@modules/accounts/useCases/ActivateUser/errors/ServiceTokenExpired';
import { ServiceTokenNotFound } from '@modules/accounts/useCases/ActivateUser/errors/ServiceTokenNotFound';
import { ServiceTokenNotValid } from '@modules/accounts/useCases/ActivateUser/errors/ServiceTokenNotValid';
import { IAppointmentsRepository } from '@modules/player/repositories/IAppointmentsRepository';
import dayjs from 'dayjs';
import { IStaffReposiotry } from '@modules/staff/repositories/IStaffRepository';
import { ChangeStaffInteriviewStaffNotExists } from '@modules/staff/useCases/ChangeStaffInterview/errors/ChangeStaffInteriviewStaffNotExists';
import { ChangeStaffIntervieAppointmentNotExists } from '@modules/staff/useCases/ChangeStaffInterview/errors/ChangeStaffIntervieAppointmentNotExists';

type ChangeStaffInterviewRequest = {
  user: { id: string };
  tokenId: string;
  appointmentId: string;
};

type ChangeStaffInterviewResponse = Either<
  | ChangeStaffInteriviewStaffNotExists
  | ChangeStaffIntervieAppointmentNotExists
  | ServiceTokenNotFound
  | ServiceTokenNotValid
  | ServiceTokenAlreadyUsed
  | ServiceTokenExpired,
  boolean
>;

export class ChangeStaffInterview {
  constructor(
    private usersRepository: IUserRepository,
    private appointmentRepository: IAppointmentsRepository,
    private staffsRepository: IStaffReposiotry,
    private tokenRepository: ITokensRepository
  ) { }

  async execute({
    user,
    tokenId,
    appointmentId,
  }: ChangeStaffInterviewRequest): Promise<ChangeStaffInterviewResponse> {
    const token = await this.tokenRepository.getById(tokenId);

    if (!token) {
      return left(new ServiceTokenNotFound());
    }

    if (token.type !== 'appointments') {
      return left(new ServiceTokenNotValid());
    }

    if (token.used) {
      return left(new ServiceTokenAlreadyUsed());
    }

    if (dayjs().isAfter(dayjs.unix(token.expiresIn))) {
      return left(new ServiceTokenExpired());
    }

    const appointment = await this.appointmentRepository.findById(
      appointmentId
    );

    if (!appointment) {
      return left(new ChangeStaffInteriviewStaffNotExists());
    }

    const oldStaff = await this.staffsRepository.findById(appointment.staff_id);
    const staff = await this.staffsRepository.findByUserID(user.id);

    if (!staff) {
      return left(new ChangeStaffIntervieAppointmentNotExists());
    }

    const oldStaffAccount = await this.usersRepository.findOne(
      oldStaff.user_id
    );
    const account = await this.usersRepository.findOne(staff.user_id);
    const useraccount = await this.usersRepository.findOne(appointment.user_id);

    appointment.setStaff = staff.id;

    await Discord.REST.sendMessage(
      `**${account.username.value}** aceitou substituir **${oldStaffAccount.username.value}** na entrevista de ${useraccount.username.value} :white_check_mark:`,
      process.env.BOT_DISCORD_CHANNEL
    );

    appointment.setAppointmentStatus = 'CHECK_IN';

    token.MarkHasUsed = true;

    await this.tokenRepository.saveSingle(token);
    await this.appointmentRepository.save(appointment);

    return right(true);
  }
}
