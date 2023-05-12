import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import WelcomeChat from './pages/WelcomeChat';
import SocketCtxWrapper from './context/SocketCtxWrapper';
import { useState } from 'react';
// import RoomChat from './pages/RoomChat';
import UserLoginForm from './components/UserLoginForm';
import UserRegisterForm from './components/UserRegisterForm';
import { User } from './Interfaces/Interfaces';
import Header_bar from './components/Header_bar';

function App() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  // todo: Check if user is already logged

  // const isLoggedIn = loggedUser !== null;

  return (
    <div className="App">
      {/* Apply the Provider property of the Socket Context to the app and
      feed it with the state and dispatch objects from the reducer defined */}
      <Header_bar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome/login" />} />
          <Route
            path="/welcome/login"
            element={<UserLoginForm setLoggedUser={setLoggedUser} />}
          />
          <Route
            path="/welcome/register"
            element={<UserRegisterForm setLoggedUser={setLoggedUser} />}
          />
          <Route
            path="/chat/:currentRoom"
            element={
              <SocketCtxWrapper loggedUser={loggedUser}>
                <WelcomeChat />
              </SocketCtxWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
