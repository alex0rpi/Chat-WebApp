// This component will only be visible at the welcome chat, once the user is identified.
import { Button } from 'react-bootstrap';
import { Room, User } from '../Interfaces/Interfaces';

interface RoomListProps {
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
    if (nextRoom === currentRoom) {
      return;
    }
    onRoomClick(nextRoom);
  };

  return (
    <div className="room-list">
      <div className="d-grid gap-1">
        {sortedRooms &&
          sortedRooms.map((room) => {
            const connectedUsers: number = room.users!.length;
            return (
              <div className="roomListItem" key={room.roomId}>
                <span>{connectedUsers! > 0 && connectedUsers}</span>
                <Button
                  variant={room.roomName === currentRoom ? 'warning' : 'secondary'}
                  size="sm"
                  className="text-truncate room-button"
                  onClick={onRoomChange}
                >
                  {room.roomName}
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RoomListBox;
