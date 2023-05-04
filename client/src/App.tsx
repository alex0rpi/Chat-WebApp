import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RoomChat from './pages/RoomChat';
import WelcomeChat from './pages/WelcomeChat';
import {
  initialSocketContext,
  SocketContext,
  reducerFunction,
  ISocketContext,
  IReducerActions,
} from './context/SocketContext';
import React, { useReducer, useEffect } from 'react';
import { socket } from './socket';

function App() {
  const [appState, dispatch] = useReducer<React.Reducer<ISocketContext, IReducerActions>>(
    reducerFunction,
    initialSocketContext
  );
  /* <React.Reducer<ISocketContext, IReducerActions>> help with type checking and ensures 
  that the state and action objects are used correctly in the reducer function. */

  // ----------------

  /* INIT THE SOCKET, connect to the server and provide this socket to
    the context so that it can be used by the child components. */
  useEffect(() => {
    appState.socket?.on('message', ({ message }) => {
      console.log(message);
      dispatch({ type: 'update_messages', payload: message });
    });
  }, []);

  // ----------------

  return (
    <div className="App">
      {/* Apply the Provider property of the Socket Context to the app and
      feed it with the state and dispatch objects from the reducer defined */}
      <SocketContext.Provider value={{ appState, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route path="/welcome" element={<WelcomeChat />} />
            {/* <Route path="/rooms/someroomname" element={<RoomChat />} /> */}
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
