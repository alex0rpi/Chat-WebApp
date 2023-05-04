// This input component will be visible:
// at welcome chat once the user is identified
// at a room chat

import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Button } from 'react-bootstrap';


const ConnectedUsersBox = () => {
  const { appState } = useContext(SocketContext);

  // const usersInWelcomeChat = appState.logged_users.length;

  // appState.socket?.on('activeUsers', (data) => console.log(data.activeUserList));

  return (
    <div className="user-list">
      {/* <h6>Connected ({usersInWelcomeChat})</h6> */}
      <div className="d-grid gap-1">
        {/* {appState.logged_users.map((user) => {
          console.log(user.username);
          return (
            <Button key={user.id} variant="warning" size="sm">
              👦{user.username}
            </Button>
          );
        })} */}

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
