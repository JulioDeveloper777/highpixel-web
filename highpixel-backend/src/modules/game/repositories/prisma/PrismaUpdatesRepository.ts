import { prisma } from '@infra/prisma/prisma-client';
import { Update } from '@modules/game/domain/Update';
import { UpdateMapper } from '@modules/game/mappers/UpdateMapper';
import { IUpdatesRepository } from '@modules/game/repositories/IUpdatesRepository';

export class PrismaUpdatesRepository implements IUpdatesRepository {
  async create(update: Update): Promise<void> {
    const data = UpdateMapper.toPersistence(update);

    await prisma.update.create({
      data,
    });
  }

  async getUpdatesByDate(date: Date): Promise<Update[]> {
    const dbQuery = await prisma.update.findMany({
      orderBy: {
        release: 'asc',
      },
      where: {
        release: {
          gt: date,
          not: date,
        },
      },
    });

    return dbQuery.map(u => UpdateMapper.toDomain(u));
  }
}
