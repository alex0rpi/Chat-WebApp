import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import WelcomeChat from './pages/WelcomeChat';
import SocketCtxWrapper from './context/SocketCtxWrapper';
import { useState } from 'react';
// import RoomChat from './pages/RoomChat';
import UserLoginForm from './components/UserLoginForm';
import UserRegisterForm from './components/UserRegisterForm';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  // todo: Check if user is already logged

  // const isLoggedIn = loggedUser !== null;

  return (
    <div className="App">
      {/* Apply the Provider property of the Socket Context to the app and
      feed it with the state and dispatch objects from the reducer defined */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<UserLoginForm/>} />
          <Route
            path="/register"
            element={<UserRegisterForm/>}
          />
          <Route
            path="/welcome"
            element={
              <SocketCtxWrapper loggedUser={loggedUser}>
                <WelcomeChat/>
              </SocketCtxWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
