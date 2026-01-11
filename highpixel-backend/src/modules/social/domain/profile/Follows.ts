import { WatchedList } from '@core/domain/WatchedList';
import { Follow } from '@modules/social/domain/profile/Follow';

export class Follows extends WatchedList<Follow> {
  private constructor(follows: Follow[]) {
    super(follows);
  }

  public compareItems(a: Follow, b: Follow): boolean {
    return a.equals(b);
  }

  public static create(follows?: Follow[]): Follows {
    return new Follows(follows || []);
  }
}
