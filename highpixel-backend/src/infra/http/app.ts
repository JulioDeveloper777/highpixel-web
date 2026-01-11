import Queue from '@infra/libs/queue/bull';
import { prisma } from '@infra/prisma/prisma-client';
import * as Discord from '@infra/services/discord';
import { IConnectionsRepository } from '@modules/accounts/repositories/IConnectionsRepository';
import { PrismaConnectionsRepository } from '@modules/accounts/repositories/implementations/PrismaConnectionsRepository';
import { PrismaUserRepository } from '@modules/accounts/repositories/implementations/PrismaUsersRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppointmentMapper } from '@modules/player/mappers/AppointmentMapper';
import log from '@vendor/log';
import cors from 'cors';
import { Client, GatewayIntentBits } from 'discord.js';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { auth as authConfig } from '@config/auth';
import { emitter } from '@infra/events/emitter';
import { Router } from '@infra/http/routes';
import cookieParser from 'cookie-parser';

class HighPixelAPI {
  public app: express.Application;
  public io: Server;
  public server: any;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    // initialize global emitter with Socket.IO instance
    try {
      emitter.init(this.io);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to init emitter', err);
    }

    // optional socket auth middleware: verify JWT token sent via `auth.token`
    try {
      this.io.use((socket, next) => {
        try {
          const token = socket.handshake.auth?.token ||
            (socket.handshake.headers?.authorization
              ? String(socket.handshake.headers.authorization).replace(/^Bearer\s+/i, '')
              : null);

          if (!token) return next();

          const payload = verify(token, authConfig.secretKey as string);
          // attach user payload to socket data for later use
          // @ts-ignore
          socket.data.user = payload;
          return next();
        } catch (err) {
          // allow connection even if token invalid (no strict enforcement)
          return next();
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Socket auth middleware setup failed', err);
    }

    // log connections for debugging
    try {
      this.io.on('connection', (socket) => {
        // eslint-disable-next-line no-console
        console.log('Socket connected', socket.id, socket.data?.user || null);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Socket connection logging failed', err);
    }

    Queue.process();

    /*
      Propagate the middlewares
    */
    this.middlewares();
    this.upcomingAppointments(
      new PrismaUserRepository(),
      new PrismaConnectionsRepository()
    );

    /*
      Discord up
    */

    const bot = new Client({
      intents: [GatewayIntentBits.Guilds],
    });

    Discord.REST.prepare(bot).then(() => {
      log.success('Modules: discord has been loaded');
    });
  }

  private middlewares(): void {
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
        exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
      })
    );

    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json({ type: ['application/json', 'text/plain'] }));
    this.app.use(Router);
  }

  private upcomingAppointments(
    usersRepository: IUserRepository,
    connectionsRepository: IConnectionsRepository
  ): void {
    prisma.appointments
      .findMany({
        where: {
          status: 'WAITING',
        },
      })
      .then(data => {
        if (data.length < 1) {
          return false;
        }

        data.map(async appointment => {
          const user = await usersRepository.findOne(appointment.user_id);

          if (user) {
            const connection =
              await connectionsRepository.getByUserAndPlataform(
                user.id,
                'Discord'
              );

            if (connection) {
              try {
                const { access_token, refresh_token } =
                  await Discord.OAUTH2.getTokenByRefresh(connection.fallback);
                connection.updateFallback = refresh_token;

                await Queue.add('InterviewAppointment', {
                  userId: user.id,
                  appointment: AppointmentMapper.toDomain(appointment),
                });

                await connectionsRepository.saveSingle(connection);

                await Discord.REST.sendMessage(
                  `**SCHEDULE OF**: ${user.username.value} WAS RECOVERED SUCCESSFULLY. :evergreen_tree:`,
                  process.env.BOT_DISCORD_CHANNEL
                );
              } catch (error) {
                await Discord.REST.sendMessage(
                  `**SCHEDULE OF**: ${user.username.value} HAS ERRORS :red_circle:`,
                  process.env.BOT_DISCORD_CHANNEL
                );
              }
            } else {
              await Discord.REST.sendMessage(
                `**SCHEDULE OF**: ${user.username.value} HAS ERRORS :red_circle:`,
                process.env.BOT_DISCORD_CHANNEL
              );

              return false;
            }
          }
        });
      });
  }
}

export default new HighPixelAPI().server;