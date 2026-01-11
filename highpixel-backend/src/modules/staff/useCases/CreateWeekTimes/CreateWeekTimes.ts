import { Either, left, right } from '@core/logic/Either';
import { Time } from '@modules/staff/domain/Time';
import { IStaffReposiotry } from '@modules/staff/repositories/IStaffRepository';
import { CreateWeekTimeInvalidRequest } from '@modules/staff/useCases/CreateWeekTimes/errors/CreateWeekTimeInvalidRequest';
import { CreateWeekTimesInvalidTimesLength } from '@modules/staff/useCases/CreateWeekTimes/errors/CreateWeekTimesInvalidTimesLength';
import { CreateWeekTimeStaffNotFound } from '@modules/staff/useCases/CreateWeekTimes/errors/CreateWeekTimeStaffNotFound';

type TimeType = {
  date: string;
};

type CreateWeekTimesRequest = {
  id: string;
  times: TimeType[];
};

type CreateWeekTimesResponse = Either<
  | CreateWeekTimeStaffNotFound
  | CreateWeekTimeInvalidRequest
  | CreateWeekTimesInvalidTimesLength,
  boolean
>;

export class CreateWeekTimes {
  constructor(private staffRepository: IStaffReposiotry) { }

  async execute({
    times,
    id,
  }: CreateWeekTimesRequest): Promise<CreateWeekTimesResponse> {
    if (times.length <= 0) {
      return left(new CreateWeekTimesInvalidTimesLength());
    }

    const exists = await this.staffRepository.exists(id);

    if (!exists) {
      return left(new CreateWeekTimeStaffNotFound());
    }

    const staff = await this.staffRepository.findByUserID(id);

    times.map(time => {
      return staff.WeekOut(
        Time.create({
          date: time.date,
          staff_id: staff.id,
        })
      );
    });

    await this.staffRepository.save(staff);

    return right(true);
  }
}
