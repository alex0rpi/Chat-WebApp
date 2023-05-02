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
import React, { useReducer, useRef } from 'react';

function App() {
  const [appState, dispatch] = useReducer<React.Reducer<ISocketContext, IReducerActions>>(
    reducerFunction,
    initialSocketContext
  );
  /* <React.Reducer<ISocketContext, IReducerActions>> help with type checking and ensures 
  that the state and action objects are used correctly in the reducer function. */

  return (
    <div className="App">
      {/* Apply the Provider property of the Socket Context to the app and
      feed it with the state and dispatch objects from the reducer defined */}
      <SocketContext.Provider value={{ appState: appState, appDispatch: dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route path="/welcome" element={<WelcomeChat />} />
            <Route path="/rooms/someroomname" element={<RoomChat />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
