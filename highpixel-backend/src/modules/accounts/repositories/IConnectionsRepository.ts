import { Connection } from "@modules/accounts/domain/Connection";
import { Connections } from "@modules/accounts/domain/Connections";

export interface IConnectionsRepository {
  create(connections: Connections): Promise<void>;
  save(connections: Connections): Promise<void>;
  saveSingle(connection: Connection): Promise<void>;
  getByUserAndPlataform(userId: string, plataform: string): Promise<Connection>;
}