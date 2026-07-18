import { io } from 'socket.io-client';

// Replace with your backend URL
const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Connect manually when needed
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
    console.log('Socket connecting to:', SOCKET_URL);
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log('Socket disconnected');
  }
};
