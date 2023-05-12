// This component will only be visible at the welcome chat, once the user is identified.
import { Button } from 'react-bootstrap';
import { Room, User } from '../Interfaces/Interfaces';
import { Socket } from 'socket.io-client';

interface RoomListProps {
  socket: Socket | undefined;
  roomList: Room[];
  currentRoom: string | undefined;
  onRoomClick: (nextRoom: string) => void;
  currentUser: User | undefined;
}

const RoomListBox = (props: RoomListProps) => {
  const { currentRoom, roomList, onRoomClick } = props;

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

  const onRoomChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const nextRoom = event.currentTarget.innerText;
    onRoomClick(nextRoom);
  };

  return (
    <div className="room-list">
      <div className="d-grid gap-1">
        {sortedRooms &&
          sortedRooms.map((room) => {
            return (
              <Button
                // ref={roomButtonRef}
                key={room.roomId}
                variant={room.roomName === currentRoom ? 'warning' : 'secondary'}
                size="sm"
                className="text-truncate"
                onClick={onRoomChange}
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
