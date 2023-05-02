// This input component will be visible:
// at welcome chat once the user is identified
// at a room chat

import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Button } from 'react-bootstrap';
import { User } from '../models/Interfaces';

type connectedUsersProps = {
  welcomeChatUsers: User[];
};

const ConnectedUsersBox = ({ welcomeChatUsers }: connectedUsersProps) => {
  const { appState } = useContext(SocketContext);

  const usersInWelcomeChat = welcomeChatUsers.length;

  return (
    <div className="user-list">
      <h6>Connected ({usersInWelcomeChat})</h6>
      <div className="d-grid gap-1">
        {appState.logged_users.map((user) => {
          console.log(user.username);
          return (
            <Button variant={user.id === appState.uid ? 'warning' : 'secondary'} size="sm" key={user.id}>
              👦{user.username}
            </Button>
          );
        })}

        {/* UI samples, current user should be warning highlighted */}
        {/* <div className="d-grid gap-1">
          <Button variant="warning" size="sm">
            My_user
          </Button>
          <Button variant="secondary" size="sm">
            User_1
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ConnectedUsersBox;
