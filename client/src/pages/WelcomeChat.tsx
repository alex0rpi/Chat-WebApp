import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import RoomListBox from '../components/RoomListBox';
import ConnectedUsersBox from '../components/ConnectedUsersBox';
import { Button } from 'react-bootstrap';
import ContainerChatWindow from '../layout/ContainerChatWindow';
import { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Room } from '../models/Interfaces';
import { useParams } from 'react-router-dom';
import NewRoomForm from '../components/NewRoomForm';

const WelcomeChat = () => {
  const { currentRoom } = useParams(); // in case I am in a room, indicated at the url
  const [rooms, setRooms] = useState<Room[]>([]);
  const { appState } = useContext(SocketContext);
  const { socket } = appState;

  useEffect(() => {
    socket?.on('update_user_room', (data) => {
      const { rooms: roomsReceived } = data; // all existing rooms
      setRooms(roomsReceived);
    });
  }, [currentRoom, socket]);

  // Detect update_rooms event from server
  useEffect(() => {
    socket?.on('update_rooms', (updatedRooms) => {
      console.log(updatedRooms);
      setRooms(updatedRooms); // all existing rooms
    });
  }, [socket]);

  const handleExit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // appState.socket?.disconnect();
    // dispatch({ type: 'remove_user', payload: null });
  };

  return (
    <ContainerChatWindow>
      <NewRoomForm socket={socket} setRooms={setRooms} />

      <div className="exit-btn">
        <Button onClick={handleExit}>Disconnect</Button>
      </div>
      <ChatBox currentRoom={currentRoom} />
      <ConnectedUsersBox />
      <RoomListBox roomList={rooms} currentRoom={currentRoom} />
      <MessageInput currentRoom={currentRoom} />
    </ContainerChatWindow>
  );
};

export default WelcomeChat;
