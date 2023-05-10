// This component will only be visible at the welcome chat, once the user is identified.
import { Button } from 'react-bootstrap';
import { Room, User } from '../Interfaces/Interfaces';
import { Socket } from 'socket.io-client';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface RoomListProps {
  roomList: Room[];
  currentRoom: string | undefined;
  socket: Socket | undefined;
  currentUser: User | undefined;
}

const RoomListBox = (props: RoomListProps) => {
  const { currentRoom, roomList, socket } = props;
  const roomButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  /* show and sort rooms alphabetically */
  /* place the welcome room on the first place */
  const sortedRooms: Room[] = [...roomList].sort((a, b) =>
    a.roomName.localeCompare(b.roomName)
  );

  sortedRooms.map((roomItem, index) => {
    if (roomItem.roomName === 'welcome') {
      const welcomeRoom = sortedRooms[index];
      sortedRooms.splice(index, 1);
      sortedRooms.unshift(welcomeRoom);
    }
    return roomItem;
  });

  const onRoomClick = () => {
    // alert('You are about to change the room.');
    navigate(`/chat/${roomButtonRef.current?.innerText}`);
    socket?.emit(
      'enter_room',
      props.currentUser?.userId,
      roomButtonRef.current?.innerText
    );
  };

  return (
    <div className="room-list">
      <div className="d-grid gap-1">
        {sortedRooms &&
          sortedRooms.map((room) => {
            return (
              <Button
                ref={roomButtonRef}
                key={room.roomId}
                variant={room.roomName === currentRoom ? 'warning' : 'secondary'}
                size="sm"
                className="text-truncate"
                onClick={onRoomClick}
              >
                {room.roomName}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default RoomListBox;
