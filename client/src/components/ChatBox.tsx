import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Message, User } from '../models/Interfaces';

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { appState } = useContext(SocketContext);

  const { socket, current_uid } = appState;
  const user = JSON.parse(current_uid) as User

  // Listen for messages from server

  // appState.socket?.on('message', ({ message }) => {
  // dispatch({ type: 'update_messages', payload: message });
  // });

    // Updated messages list
    useEffect(() => {
      socket?.on('update_messages', (roomName, newMessages) => {
        if (roomName === room) {
          setMessages(newMessages)
        }
      })
    }, [room, socket])

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
