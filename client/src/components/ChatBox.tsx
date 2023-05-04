import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

const ChatBox = () => {
  const { appState } = useContext(SocketContext);
  const [message, setMessage] = useState(null);
  // Listen for messages from server
  appState.socket?.on('message', ({ message }) => {
    setMessage(message);
  });

  return (
    <div className="chat-box">
      <p>{message}</p>
    </div>
  );
};

export default ChatBox;
