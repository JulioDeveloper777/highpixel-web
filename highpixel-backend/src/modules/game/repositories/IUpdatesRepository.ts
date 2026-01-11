import { Update } from '@modules/game/domain/Update';

export interface IUpdatesRepository {
  create(update: Update): Promise<void>;
  getUpdatesByDate(date: Date): Promise<Update[]>;
}
