import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { User } from '../Interfaces/Interfaces';
import {
  initialSocketContext,
  SocketContextProvider,
  reducerFunction,
} from './SocketContext';
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

  const SendIntegrate = async (): Promise<void> => {
    console.log('Sending Integrate to server ...');
    socket.emit('integrate', loggedUser, (current_uid: string) => {
      // console.info('User integrate callback message received')
      // This function is called when the server responds with the current user id and the list of connected users
      dispatch({ type: 'update_current_uid', payload: current_uid });
      setLoading(false);
    });
  };

  useEffect(() => {
    socket.connect();
    dispatch({ type: 'update_socket', payload: socket });
    void SendIntegrate(); // preceding with void tells TS to ignore anything the function returns.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <>
        <p>Loading Socket IO...</p>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </>
    );
  }

  return (
    <SocketContextProvider value={{ appState, dispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketCtxWrapper;
