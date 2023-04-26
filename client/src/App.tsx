import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import RoomChat from './pages/RoomChat';
import WelcomeChat from './pages/WelcomeChat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<WelcomeChat />} />
          <Route path="/rooms/someroomname" element={<RoomChat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
