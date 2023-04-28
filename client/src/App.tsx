import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RoomChat from './pages/RoomChat';
import WelcomeChat from './pages/WelcomeChat';
import { initialSocketContext, SocketContext, reducerFunction } from './context/SocketContext';
import { useReducer } from 'react';

function App() {
  const [appState, dispatch] = useReducer(reducerFunction, initialSocketContext);

  // Suposo que implementarí aquí mateix els events i escoltes del socket
  // Però abans vull donar més forma a l'estructura del frontend.

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

/* 
export const initialSocketContext: ISocketContext = {
  socket: undefined,
  uid: null,
  users: [],
  messages: [],
  rooms: [], //
};
*/
