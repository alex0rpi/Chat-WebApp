import { Button } from 'react-bootstrap';
import { Room, User } from '../Interfaces/Interfaces';

interface ConnectedUsersBoxProps {
  currentUser: User;
  currentRoom: string | undefined;
  roomList: Room[];
}

const ConnectedUsersBox = (props: ConnectedUsersBoxProps) => {
  // Get the room where the user is
  const room: Room | undefined = props.roomList.find(
    (roomObj) => roomObj.roomName === props.currentRoom
  );

  const currentUserId = props.currentUser.userId;

  // Get the users of the current room
  const usersToShow = room?.users ? [...room.users] : [];

  // Show own user at the top of the list
  usersToShow.map((user, index) => {
    if (user.userId === currentUserId) {
      const ownUser = usersToShow[index];
      usersToShow.splice(index, 1);
      usersToShow.unshift(ownUser);
      return user.userName;
    } else {
      return user.userName;
    }
  });

  return (
    <div className="user-list">
      <div className="d-grid gap-1">
        {room?.users &&
          room.users.length > 0 &&
          usersToShow.map((user) => {
            return (
              <Button
                key={user.userId}
                variant={`${user.userId === currentUserId ? 'warning' : 'primary'}`}
                size="sm"
                className="text-truncate"
              >
                🐱{user.userName}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default ConnectedUsersBox;
