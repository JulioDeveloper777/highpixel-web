import { prisma } from '@infra/prisma/prisma-client';
import { Connections } from '@modules/accounts/domain/Connections';
import { ConnectionMapper } from '@modules/accounts/mappers/ConnectionMapper';
import { IConnectionsRepository } from '@modules/accounts/repositories/IConnectionsRepository';
import { Connection } from '@modules/accounts/domain/Connection';

export class PrismaConnectionsRepository implements IConnectionsRepository {
  async create(connections: Connections): Promise<void> {
    const data = connections
      .getNewItems()
      .map(connection => ConnectionMapper.toPersistence(connection));

    await prisma.connection.createMany({ data });
  }

  async save(connections: Connections): Promise<void> {
    if (connections.getNewItems().length > 0) {
      const data = connections
        .getNewItems()
        .map(connection => ConnectionMapper.toPersistence(connection));

      await prisma.connection.createMany({
        data,
      });
    }

    if (connections.getRemovedItems().length > 0) {
      const removeIds = connections
        .getRemovedItems()
        .map(connection => connection.id);

      await prisma.connection.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    }
  }

  async getByUserAndPlataform(
    userId: string,
    plataform: string
  ): Promise<Connection> {
    const dbQuery = await prisma.connection.findFirst({
      where: {
        user_id: userId,
        plataform: plataform,
      },
    });

    if (!dbQuery) {
      return null;
    }

    return ConnectionMapper.toDomain(dbQuery);
  }

  async saveSingle(connection: Connection): Promise<void> {
    const data = ConnectionMapper.toPersistence(connection);

    await prisma.connection.update({
      where: {
        id: connection.id,
      },
      data,
    });
  }
}