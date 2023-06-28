import io from 'socket.io-client';
import { base_url } from '../Queries/Base/Base_URL';

export const socketIO = io(base_url.replace('/api/', ''), {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});
