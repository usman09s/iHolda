import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://ihold.yameenyousuf.com'; // <- dev

class WSService {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL);

      this.socket.on('connect', () => {
        console.log('=== socket connected ====');
      });

      this.socket.on('disconnect', data => {
        console.log('=== socket disconnected ====');
      });

      this.socket.on('error', data => {
        console.log('socekt error', data);
      });
    } catch (error) {
      console.log('scoket is not inialized', error);
    }
  };

  emit(event: any, data : any = {}) {
    this.socket?.emit(event, data);
  }

  on(event: any, cb: (data: any) => void) {
    this.socket?.on(event, cb);
  }

  removeListener(listenerName: any, listener: (data: any) => void) {
    this.socket?.off(listenerName, listener);
  }

  removeAllListener(listenerName: any) {
    if (listenerName) {
      this.socket?.removeAllListeners(listenerName);
    } else {
      this.socket?.removeAllListeners();
    }
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

const socketService = new WSService();

export default socketService;
