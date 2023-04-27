import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RoomChat from './pages/RoomChat';
import WelcomeChat from './pages/WelcomeChat';
import { ISocketContext, initialSocketContext, SocketContext } from './context/SocketContext';
import { Socket } from 'socket.io-client';
import { useReducer } from 'react';

function App() {
  // Everything is an 'update' action, which either creates, updates or deletes rooms/messages/users

  interface IReducerActions {
    type: 'update_socket' | 'update_uid' | 'update_users' | 'update_messages' | 'update_rooms';
    payload: string | string[] | Socket; // only 3 things can pass to the reducer
  }
  const reducerFunction = (state: ISocketContext, action: IReducerActions) => {
    console.log('Hola');
    if(action.type === 'update_socket') {
      return { ...state, socket: action.payload as Socket };
    }
  };

  const [appState, dispatch] = useReducer(reducerFunction, initialSocketContext);

  return (
    <div className="App">
      {/* Apply the Provider property of the Socket Context to the app and
      feed it with the context variables from the reducer defined */}
      <SocketContext.Provider value={{ appState, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route path="/welcome" element={<WelcomeChat />} />
            <Route path="/rooms/someroomname" element={<RoomChat />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
      ;
    </div>
  );
}

export default App;
