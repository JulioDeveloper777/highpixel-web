import { Follow } from "@modules/social/domain/profile/Follow";
import { Follows } from "@modules/social/domain/profile/Follows";

export type FindByProfileParams = {
  following_id?: string;
  followers_id: string;
};

export interface IFollowsRepository {
  findByProfileParams(params: FindByProfileParams): Promise<Follow>;
  findAllByProfileParams(params: FindByProfileParams): Promise<Follow[]>;
  save(follows: Follows): Promise<void>;
  create(follows: Follows): Promise<void>;
}