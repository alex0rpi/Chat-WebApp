import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RoomChat from './pages/RoomChat';
import WelcomeChat from './pages/WelcomeChat';
import { initialSocketContext, SocketContext, reducerFunction } from './context/SocketContext';
import { useReducer } from 'react';

function App() {
  const [appState, dispatch] = useReducer(reducerFunction, initialSocketContext);

  return (
    <div className="App">
      {/* Apply the Provider property of the Socket Context to the app and
      feed it with the context variables from the reducer defined */}
      <SocketContext.Provider value={{ appState: appState, appDispatch: dispatch }}>
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
