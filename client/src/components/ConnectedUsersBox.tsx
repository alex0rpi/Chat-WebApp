// This input component will be visible:
// at welcome chat once the user is identified
// at a room chat

import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Button } from 'react-bootstrap';

// type Props = {}

const ConnectedUsersBox = () => {
  const { appState } = useContext(SocketContext);

  return (
    <div className="user-list">
      <h6>Connected</h6>
      <div className="d-grid gap-1">
        {appState.users.map((user) => (
          <Button variant="secondary" size="sm" key={user.id}>
            👦{user.username}
          </Button>
        ))}

        {/* UI samples, current user should be warning highlighted */}
        {/* <div className="d-grid gap-1">
          <Button variant="warning" size="sm">
            My_user
          </Button>
          <Button variant="secondary" size="sm">
            User_1
          </Button>
          <Button variant="secondary" size="sm">
            User_2
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ConnectedUsersBox;
