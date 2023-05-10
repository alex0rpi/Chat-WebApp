import { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Message, Room, User } from '../Interfaces/Interfaces';

interface ChatBoxProps {
  currentRoom: string | undefined;
  roomList: Room[];
}

const ChatBox = (props: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { appState } = useContext(SocketContext);
  const { socket, current_uid } = appState;

  const roomUsers: User[] | undefined = props.roomList.find(
    (roomObj) => roomObj.roomName === props.currentRoom
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
            className={`${msgItem.userId === user.userId ? 'ownMsg' : 'message'} ${
              msgItem.userId === null && 'serverMsg'
            }`}
          >
            <small>{msgItem.createdAt}</small>
            <div>
              <p>
                {msgItem.userId === user.userId && <span>You: </span>}
                {msgItem.userId !== null && msgItem.userId !== user.userId && (
                  <span>{roomUsersObject![msgItem.userId!]}: </span>
                  // <span>{msgItem.user?.userName}: </span>
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
