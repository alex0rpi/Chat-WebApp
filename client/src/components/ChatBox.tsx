import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const ChatBox = () => {
  const { appState, dispatch } = useContext(SocketContext);
  // const [message, setMessage] = useState(null);
  // Listen for messages from server

  appState.socket?.on('infoMsg', ({ message }) => {
    // just display the message
    
  });
  appState.socket?.on('message', ({ message }) => {
    dispatch({ type: 'update_messages', payload: message });
  });

  return (
    <div className="chat-box">
      {appState.messages.map((message, index) => {
        return (
          <div key={index} className="message">
            <p className="message-text">{message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
