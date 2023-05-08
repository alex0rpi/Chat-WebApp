import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Message, User } from '../models/Interfaces';
import { useParams } from 'react-router-dom';

const ChatBox = () => {
  const { room } = useParams(); // in case I am in a room, indicated at the url
  console.log(room);

  const [messages, setMessages] = useState<Message[]>([]);
  const { appState } = useContext(SocketContext);
  const { socket, current_uid } = appState;

  const user = JSON.parse(current_uid) as User;
  console.log(user);

  // Listen for messages from server

  // appState.socket?.on('message', ({ message }) => {
  // dispatch({ type: 'update_messages', payload: message });
  // });

  // Enter room
  useEffect(() => {
    socket?.emit('enter_room', user.userId, room);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Updated messages list
  useEffect(() => {
    socket?.on('update_messages', (roomName, newMessages) => {
      if (roomName === room) {
        setMessages(newMessages);
      }
    });
  }, [room, socket]);

  return (
    <div className="chat-box">
      {messages.map((msgItem, index) => {
        return (
          <div
            key={index}
            className={`${msgItem.userId === user.userId ? 'ownMsg' : 'message'}`}
          >
            <small>{msgItem.createdAt}</small>
            <div className="msg-text">
              {msgItem.userId === user.userId && <span>You: </span>}
              <p>{msgItem.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
