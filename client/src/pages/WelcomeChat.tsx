import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import RoomListBox from '../components/RoomListBox';
import ConnectedUsersBox from '../components/ConnectedUsersBox';
import { Button } from 'react-bootstrap';
import ContainerChatWindow from '../layout/ContainerChatWindow';
import { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Message, Room, User } from '../Interfaces/Interfaces';
import { useNavigate, useParams } from 'react-router-dom';
import NewRoomForm from '../components/NewRoomForm';

const WelcomeChat = () => {
  const navigate = useNavigate();
  //const { currentRoom } = useParams(); // in case I am in a room, indicated at the url
  const [currentRoom, setCurrentRoom] = useState('welcome'); // in case I am in a room, indicated at the url
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const { appState, dispatch } = useContext(SocketContext);
  const { socket, current_uid } = appState;

  const currentUser = JSON.parse(current_uid) as User;

  // *When I log into the app after login/register
  useEffect(() => {
    const data = {
      userId: currentUser.userId,
      roomName: currentRoom,
    };
    socket?.emit('enter_room', data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // !abans tenia només currentRoom a les dependències

  // *If anyone enters the room
  useEffect(() => {
    socket?.on('update_user_room', (data) => {
      const { users, rooms: roomsReceived } = data;
      // all existing rooms with their users
      dispatch({ type: 'update_logged_users', payload: users });
      setRooms(roomsReceived);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom, socket]);

  // *If someone writes a message
  /*   useEffect(() => {
    console.log(currentRoom);
    socket?.on('update_messages', (data) => {
      const { roomName, newMessages } = data;
      console.log('roomName received on update_messages:', roomName);
      console.log('newMessages received on update_messages: ', newMessages);
      console.log(roomName === currentRoom);
      // eslint-disable-next-line no-debugger
      debugger
      if (roomName === currentRoom) {
        setMessages(newMessages);
      }
    });
  }, [currentRoom, socket]); */
  const handleUpdateMessage = () => {
    socket?.on('update_messages', (data) => {
      const { roomName, newMessages } = data;
      console.log('roomName received on update_messages:', roomName);
      console.log('newMessages received on update_messages: ', newMessages);
      console.log(roomName === currentRoom);
      // eslint-disable-next-line no-debugger
      debugger;
      if (roomName === currentRoom) {
        setMessages(newMessages);
      }
    });
  };

  // *If a new room is created
  useEffect(() => {
    socket?.on('update_rooms', (updatedRooms) => {
      // console.log(updatedRooms);
      setRooms(updatedRooms); // all existing rooms
    });
  }, [socket]);

  const handleExit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // alert('You are about to disconnect from the chat.');
    appState.socket?.disconnect();
    dispatch({ type: 'remove_user', payload: null });
    localStorage.removeItem('token');
    navigate('/welcome/login');
  };

  const onRoomClickHandler = (nextRoom: string) => {
  
    // alert('You are about to change the room.');
    const data = {
      userId: currentUser.userId,
      roomName: nextRoom,
    };
    socket?.emit('enter_room', data);
    setCurrentRoom(nextRoom);

    socket?.on('update_messages', (data) => {
      const { roomName, newMessages } = data;
      console.log('roomName received on update_messages:', roomName);
      console.log('newMessages received on update_messages: ', newMessages);
      console.log(roomName === currentRoom);

      if (roomName === nextRoom) {
        setMessages(newMessages);
      }
    });
    //navigate(`/chat/${nextRoom}`);
  };

  return (
    <ContainerChatWindow>
      <NewRoomForm socket={socket} setRooms={setRooms} />
      <div className="exit-btn">
        <Button onClick={handleExit}>Disconnect</Button>
      </div>
      <ChatBox messages={messages} />
      <RoomListBox
        roomList={rooms}
        currentRoom={currentRoom}
        onRoomClick={onRoomClickHandler}
        currentUser={currentUser}
      />
      <ConnectedUsersBox
        currentUser={currentUser}
        currentRoom={currentRoom}
        roomList={rooms}
      />
      <MessageInput handleUpdateMessage={handleUpdateMessage} currentRoom={currentRoom} />
    </ContainerChatWindow>
  );
};

export default WelcomeChat;
