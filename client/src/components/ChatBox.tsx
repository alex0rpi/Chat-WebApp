import { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Message, User } from '../Interfaces/Interfaces';
import { useParams } from 'react-router-dom';

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { appState } = useContext(SocketContext);
  const { socket, current_uid } = appState;
  const { currentRoom } = useParams();

  const user = JSON.parse(current_uid) as User;

  // Enter room
  useEffect(() => {
    const data = {
      userId: user.userId,
      roomName: currentRoom,
    };
    socket?.emit('enter_room', data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom]);

  // Updated messages list
  useEffect(() => {
    socket?.on('update_messages', (data) => {
      const { roomName, newMessages } = data;
      console.log('roomName received on update_messages:', roomName);
      console.log('newMessages received on update_messages: ', newMessages);
      if (roomName === currentRoom) {
        setMessages(newMessages);
      }
    });
  }, [currentRoom, socket]);

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
            className={`${msgItem.userId === user.userId ? 'ownMsg' : 'message'} ${
              msgItem.userId === null && 'serverMsg'
            }`}
          >
            <small>{msgItem.createdAt}</small>
            <div>
              <p>
                {msgItem.userId === user.userId && <span>You: </span>}
                {msgItem.userId !== null && msgItem.userId !== user.userId && (
                  <span>{msgItem.userName}: </span>
                )}
                {msgItem.message}
              </p>
              {msgItem.userId === null && <hr />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
