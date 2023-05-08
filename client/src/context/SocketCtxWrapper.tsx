import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { User } from '../models/Interfaces';
import { initialSocketContext, SocketContextProvider, reducerFunction } from './SocketContext';
import { useSocket } from '../hooks/useSocketHook';

export interface ISocketContextComponentProps extends PropsWithChildren {
  loggedUser: User | null;
}

const SocketCtxWrapper: React.FunctionComponent<ISocketContextComponentProps> = ({
  children,
  loggedUser,
}) => {
  const socket = useSocket('http://localhost:5000', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });

  const [appState, dispatch] = useReducer(reducerFunction, initialSocketContext);

  const [loading, setLoading] = useState(true);

  // * Put in motion some initial function in a useEffect: StartListeners, SendHandshake

  const StartListeners = (): void => {
    /** User connected event */
    socket.on('user_connected', (users: string[]) => {
      // console.info('User connected message received')
      dispatch({ type: 'update_logged_users', payload: users });
    });

    /** User Disconnected event */
    socket.on('user_disconnected', (uid: string) => {
      // console.info('User disconnected message received')
      dispatch({ type: 'remove_user', payload: uid });
    });

    /** Connection / reconnection listeners */
    socket.io.on('reconnect', (attempt) => {
      console.log(`Reconnected on attempt: ${attempt}`);
      void SendHandshake();
    });

    socket.io.on('reconnect_attempt', (attempt) => {
      console.log(`Reconnection Attempt: ${attempt}`);
    });

    socket.io.on('reconnect_error', (error) => {
      console.info('Reconnection error: ', error);
    });

    socket.io.on('reconnect_failed', () => {
      console.info('Reconnection failure.');
      alert(
        'We were unable to connect you to the chat.  Please make sure your internet connection is stable or try again later.'
      );
    });
  };

  const SendHandshake = async (): Promise<void> => {
    console.log('Sending handshake to server ...');

    socket.emit('handshake', loggedUser, async (uid: string, users: string[]) => {
      // console.info('User handshake callback message received')
      dispatch({ type: 'update_current_uid', payload: uid });
      dispatch({ type: 'update_logged_users', payload: users });

      setLoading(false);
    });
  };

  useEffect(() => {
    socket.connect();
    dispatch({ type: 'update_socket', payload: socket });
    StartListeners();
    void SendHandshake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>... Loading Socket IO</p>;

  return (
    <SocketContextProvider value={{ appState, dispatch }}>{children}</SocketContextProvider>
  );
};

export default SocketCtxWrapper;
