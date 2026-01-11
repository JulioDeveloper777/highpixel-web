import Cookies from 'js-cookie';

type SocketClient = {
  connect: () => Promise<void>;
  on: (event: string, cb: (...args: any[]) => void) => void;
  off: (event: string, cb?: (...args: any[]) => void) => void;
  disconnect: () => void;
};

let socket: any = null;

export const socketClient: SocketClient = {
  connect: async () => {
    if (socket && socket.connected) return;
    try {
      const io = (await import('socket.io-client')).default;
      const token = Cookies.get('token');
      const base =
        (process.env.NEXT_PUBLIC_BASE_URL as string) ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4000');

      socket = io(base, {
        auth: { token },
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
      });
      socket.on('connect_error', (err: any) => {
        // eslint-disable-next-line no-console
        console.warn('Socket connect_error', err);
      });
    } catch (err) {
      // dynamic import failed (dependency may be missing)
      // eslint-disable-next-line no-console
      console.warn('socket.io-client not available', err);
    }
  },
  on: (event: string, cb: (...args: any[]) => void) => {
    if (!socket) return;
    socket.on(event, cb);
  },
  off: (event: string, cb?: (...args: any[]) => void) => {
    if (!socket) return;
    socket.off(event, cb);
  },
  disconnect: () => {
    if (!socket) return;
    socket.disconnect();
    socket = null;
  },
};

export default socketClient;
