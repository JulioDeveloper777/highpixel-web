import { Server } from 'socket.io';

class Emitter {
  private io: Server | null = null;

  init(io: Server) {
    this.io = io;
  }

  emit(event: string, payload: any) {
    try {
      if (this.io) {
        this.io.emit(event, payload);
      }
    } catch (err) {
      // ignore emitter errors in production
      // eslint-disable-next-line no-console
      console.warn('Emitter emit error', err);
    }
  }
}

export const emitter = new Emitter();
