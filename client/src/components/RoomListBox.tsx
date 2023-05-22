import { Button } from 'react-bootstrap';
import { Room, User } from '../Interfaces/Interfaces';
import { useNavigate } from 'react-router-dom';

interface RoomListProps {
  roomList: Room[];
  currentRoom: string | undefined;
  onRoomClick: (nextRoom: string) => void;
  onRoomDelete: (roomToDelete: string) => void;
  currentUser: User | undefined;
}

const RoomListBox = (props: RoomListProps) => {
  const navigate = useNavigate();

  const { currentRoom, roomList, onRoomClick, onRoomDelete } = props;

  /* show and sort rooms alphabetically */
  const sortedRooms: Room[] = [...roomList].sort((a, b) =>
    a.roomName.localeCompare(b.roomName)
  );

  /* place the welcome room on the first place */
  sortedRooms.map((roomItem, index) => {
    if (roomItem.roomName === 'welcome') {
      const welcomeRoom = sortedRooms[index];
      sortedRooms.splice(index, 1);
      sortedRooms.unshift(welcomeRoom);
    }
    return roomItem;
  });

  const onRoomChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const nextRoom = event.currentTarget.innerText;
    if (nextRoom === currentRoom) {
      return;
    }
    // *Make a fetch request to check the token
    const response = await fetch('/api/users/tokeninfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    });
    if (!response.ok) {
      alert('You are not authorized, please log in or register.');
      navigate('/gatochat/login');
      return;
    }
    onRoomClick(nextRoom);
  };

  const deleteRoomHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
    roomName: string
  ) => {
    if (confirm(`Confirm delete room ${roomName}`)) {
      event.preventDefault();
      if (roomName === currentRoom) {
        return;
      }
      // *Make a fetch request to check the token
      const response = await fetch('/api/users/tokeninfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      if (!response.ok) {
        alert('You are not authorized, please log in or register.');
        navigate('/gatochat/login');
        return;
      }
      // execute function on parent component
      onRoomDelete(roomName);
    }
  };

  return (
    <div className="room-list">
      <div className="d-grid gap-1">
        {sortedRooms &&
          sortedRooms.map((room) => {
            const connectedUsers: number = room.users!.length;
            // I use the non-null assertion '!' because there will always be an array, even if it's empty.
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
                {room.roomName !== 'welcome' && room.users?.length === 0 && (
                  <button
                    className="deleteRoomBtn"
                    onClick={(event) => deleteRoomHandler(event, room.roomName)}
                  >
                    ❌
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RoomListBox;
