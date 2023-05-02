import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const ChatBox = () => {
  const { appState } = useContext(SocketContext);
  return (
    <div className="chat-box">
      {appState.messages.map((msg) => (
        <p key={msg.id}>{msg.text}</p>
      ))}
    </div>
  );
};

export default ChatBox;
