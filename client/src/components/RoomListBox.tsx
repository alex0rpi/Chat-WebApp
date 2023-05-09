// This component will only be visible at the welcome chat, once the user is identified.
import { Button } from 'react-bootstrap';
import { Room } from '../models/Interfaces';

interface RoomListProps {
  roomList: Room[];
  currentRoom: string | undefined;
}

const RoomListBox = (props: RoomListProps) => {
  const { currentRoom, roomList } = props;

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

  return (
    <div className="room-list">
      <div className="d-grid gap-1">
        {sortedRooms &&
          sortedRooms.map((room) => {
            return (
              <Button
                key={room.roomId}
                variant={room.roomName === currentRoom ? 'primary' : 'secondary'}
                size="sm"
                className="text-truncate"
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
