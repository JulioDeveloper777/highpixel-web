import { prisma } from '@infra/prisma/prisma-client';
import TimelineSuggestion from '@modules/social/domain/suggestion/TimelineSuggestion';
import TimelineSuggestionMapper from '@modules/social/mappers/TimelineSuggestionMapper';
import ITimelineSuggestionRepository from '@modules/social/repositories/ITimelineSuggestionRepository';

export class PrismaTimelineSuggestionRepository implements ITimelineSuggestionRepository {
  async create(s: TimelineSuggestion): Promise<void> {
    const data = TimelineSuggestionMapper.toPersistence(s);
    await prisma.timelineSuggestion.create({ data });
  }

  async save(s: TimelineSuggestion): Promise<void> {
    const data = TimelineSuggestionMapper.toPersistence(s);
    await prisma.timelineSuggestion.update({ where: { id: s.id }, data });
  }

  async delete(s: TimelineSuggestion): Promise<void> {
    await prisma.timelineSuggestion.delete({ where: { id: s.id } });
  }

  async findAll(): Promise<TimelineSuggestion[]> {
    const rows = await prisma.timelineSuggestion.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map(r => TimelineSuggestionMapper.toDomain(r));
  }

  async findOne(id: string): Promise<TimelineSuggestion | null> {
    const row = await prisma.timelineSuggestion.findUnique({ where: { id } });
    if (!row) return null;
    return TimelineSuggestionMapper.toDomain(row);
  }
}

export default PrismaTimelineSuggestionRepository;
