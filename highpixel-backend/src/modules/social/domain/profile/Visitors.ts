import { WatchedList } from '@core/domain/WatchedList';
import { Visitor } from '@modules/social/domain/profile/Visitor';

export class Visitors extends WatchedList<Visitor> {
  private constructor(subscriptions: Visitor[]) {
    super(subscriptions);
  }

  public compareItems(a: Visitor, b: Visitor): boolean {
    return a.equals(b);
  }

  public static create(subscriptions?: Visitor[]): Visitors {
    return new Visitors(subscriptions || []);
  }
}
