import { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Message, User } from '../models/Interfaces';

interface ChatBoxProps {
  currentRoom: string | undefined;
}

const ChatBox = (props: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { appState } = useContext(SocketContext);
  const { socket, current_uid, logged_users } = appState;

  // console.log(logged_users);
  const user = JSON.parse(current_uid) as User;
  // console.log(user);

  // Enter room
  useEffect(() => {
    socket?.emit('enter_room', user.userId, props.currentRoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Updated messages list
  useEffect(() => {
    socket?.on('update_messages', (roomName, newMessages) => {
      if (roomName === props.currentRoom) {
        setMessages(newMessages);
      }
    });
  }, [props.currentRoom, socket]);

  // Scroll to the bottom of the chat-box
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-box" ref={messagesEndRef}>
      {messages.map((msgItem, index) => {
        return (
          <div
            key={index}
            className={`${msgItem.userId === user.userId ? 'ownMsg' : 'message'}`}
          >
            <small>{msgItem.createdAt}</small>
            <div>
              <p>
                {msgItem.userId === user.userId && <span>You: </span>}
                {msgItem.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
