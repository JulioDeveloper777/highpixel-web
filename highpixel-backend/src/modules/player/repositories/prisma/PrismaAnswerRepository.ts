import { prisma } from '@infra/prisma/prisma-client'
import { Answers } from '@modules/player/domain/Answers'
import { AnswerMapper } from '@modules/player/mappers/AnswerMapper'
import { IAnswerRepository } from '@modules/player/repositories/IAnswerRepository'

export class PrismaAnswersRepository implements IAnswerRepository {
  constructor() { }

  async save(answers: Answers): Promise<void> {
    if (answers.getNewItems().length > 0) {
      const data = answers
        .getNewItems()
        .map(answer => AnswerMapper.toPersistence(answer))

      await prisma.exam.createMany({ data })
    }

    if (answers.getRemovedItems().length > 0) {
      const removedIds = answers.getRemovedItems().map(answer => answer.id)

      await prisma.exam.deleteMany({
        where: {
          id: {
            in: removedIds,
          },
        },
      })
    }
  }

  async create(answers: Answers): Promise<void> {
    const data = answers
      .getItems()
      .map(answer => AnswerMapper.toPersistence(answer))

    await prisma.exam.createMany({
      data,
    })
  }
}
