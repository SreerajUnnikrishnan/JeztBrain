import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { user, getAccessToken } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let newSocket;

    const initSocket = async () => {
      if (user) {
        const token = await getAccessToken();
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        
        newSocket = io(BACKEND_URL, {
          auth: { token },
          transports: ['websocket'],
          reconnection: true,
        });

        newSocket.on('connect', () => {
          setIsConnected(true);
          console.log('Socket connected globally');
          
          // Join global dashboard room for notifications
          newSocket.emit('join_dashboard', { token });
        });

        newSocket.on('disconnect', () => {
          setIsConnected(false);
        });

        // Global Notifications
        newSocket.on('incident_created', (data) => {
          // If the user is an expert/admin, show alert
          if (user.role === 'expert' || user.role === 'admin' || user.role === 'network_specialist' || user.role === 'security_specialist') {
            
            // Play alert sound (using audio API)
            try {
              const audio = new Audio('/alert.mp3');
              audio.volume = 0.5;
              audio.play().catch(e => console.log('Audio play prevented by browser', e));
            } catch (err) {
              // Ignore audio play errors
            }
            toast(`🚨 NEW INCIDENT REPORTED 🚨\n${data.incidenttype || 'Incident'}\nSeverity: ${data.severitylevel || 'Unknown'}`, {
              icon: '🔴',
              duration: 6000,
              style: { border: '1px solid #ef4444' }
            });
          }
        });

        newSocket.on('incident_updated', (data) => {
          if (data.status === 'Accepted') {
            toast.success(`EXPERT ASSIGNED\nIncident ${data.ticket_number} has been claimed.`, {
              duration: 6000,
            });
          } else {
            toast(`STATUS UPDATE\nIncident ${data.ticket_number} is now ${data.status.toUpperCase()}`, {
              icon: 'ℹ️',
              duration: 6000,
            });
          }
        });

        setSocket(newSocket);
      }
    };

    initSocket();

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [user, getAccessToken]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
