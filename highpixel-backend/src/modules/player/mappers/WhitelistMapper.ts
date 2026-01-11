import { UserMapper } from '@modules/accounts/mappers/UserMapper';
import {
  Exam,
  Whitelist as PersistenceWhitelist,
  Profile,
  Staff,
  User
} from '@prisma/client';
import { Answer } from '@modules/player/domain/Answer';
import { Answers } from '@modules/player/domain/Answers';
import { Whitelist } from '@modules/player/domain/Whitelist';

type PersistenceWhitelistRaw = PersistenceWhitelist & {
  user?: User & {
    Profile: Profile;
    Staff: Staff;
  };
  exam: Exam[];
};

export class WhitelistMapper {
  static toDomain(raw: PersistenceWhitelistRaw): Whitelist {
    let exam: Answers;

    if (raw.exam) {
      let uptoAnswers: Answer[] = [];

      raw.exam.map((answer: Exam) => {
        let ans = Answer.create({
          answer: answer.answer,
          question: answer.question,
        });

        uptoAnswers = [...uptoAnswers, ans];
      });

      exam = Answers.create(uptoAnswers);
    }

    const user = UserMapper.toDomain(raw.user);

    const whitelist = Whitelist.create(
      {
        user_id: raw.user_id,
        createdAt: raw.createdAt,
        status: raw.status,
        staff_id: raw.staff_id,
        count: raw.count,
        user: user,
        exam: exam,
      },
      raw.id
    );

    return whitelist;
  }

  static toPersistence(whitelist: Whitelist) {
    return {
      id: whitelist.id,
      status: whitelist.status,
      user_id: whitelist.userid,
      staff_id: whitelist.staff_id,
      createdAt: whitelist.createdAt,
      updateAt: whitelist.updateAt,
    };
  }
}
