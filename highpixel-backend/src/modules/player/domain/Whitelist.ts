import dayjs from 'dayjs';
import { Profile } from '@prisma/client';
import { Entity } from '@core/domain/Entity';
import { User as UserRaw } from '@modules/accounts/domain/User';
import { Answer } from '@modules/player/domain/Answer';
import { Answers } from '@modules/player/domain/Answers';

interface IWhitelistProps {
  exam?: Answers;
  status?: string;
  staff_id?: string;
  user?: UserRaw & {
    Profile?: Profile;
  };
  user_id?: string;
  createdAt?: number;
  updateAt?: number;
  count?: number;
}

export class Whitelist extends Entity<IWhitelistProps> {
  get status() {
    return this.props.status;
  }

  get staff_id() {
    return this.props.staff_id;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updateAt() {
    return this.props.updateAt;
  }

  get user() {
    return this.props.user;
  }

  get count() {
    return this.props.count;
  }

  get exam() {
    return this.props.exam;
  }

  get userid() {
    return this.props.user_id;
  }

  set setWhitelistStatus(status: string) {
    this.props.status = status;
  }

  set setStaffWhitelist(staff_id: string) {
    this.props.staff_id = staff_id;
  }

  public addAnswer(answers: Answer) {
    return this.props.exam.add(answers);
  }

  private constructor(props: IWhitelistProps, id?: string) {
    super(props, id);
  }

  static create(props: IWhitelistProps, id?: string): Whitelist {
    const whitelist = new Whitelist(
      {
        ...props,
        createdAt: props.createdAt ?? dayjs().unix(),
        status: props.status ?? 'TRIAGEM',
        exam: props.exam ?? Answers.create([]),
      },
      id
    );

    return whitelist;
  }
}
