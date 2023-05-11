import { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Message, Room, User } from '../Interfaces/Interfaces';
import { useParams } from 'react-router-dom';

interface ChatBoxProps {
  roomList: Room[];
}

const ChatBox = (props: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { appState } = useContext(SocketContext);
  const { socket, current_uid } = appState;
  const { currentRoom } = useParams();

  const roomUsers: User[] | undefined = props.roomList.find(
    (roomObj) => roomObj.roomName === currentRoom
  )?.users; //array with the users Objects of the current room
  console.log(roomUsers);
  /*   [
    {"userId": 1, "userName": "user1" },
    {"userId": 2, "userName": "user2" },
  ] */

  const roomUsersObject = roomUsers?.reduce<{ [key: number]: string }>(
    (acc, userItem) => {
      acc[userItem.userId] = userItem.userName;
      return acc;
    },
    {}
  );

  console.log(roomUsersObject);

  // console.log(logged_users);
  const user = JSON.parse(current_uid) as User;
  // console.log(user);

  // Enter room
  useEffect(() => {
    socket?.emit('enter_room', user.userId, currentRoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom]);

  // Updated messages list
  useEffect(() => {
    socket?.on('update_messages', (roomName, newMessages) => {
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
        console.log(msgItem);
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
                  // <span>{roomUsersObject![msgItem.userId!]}: </span>
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
