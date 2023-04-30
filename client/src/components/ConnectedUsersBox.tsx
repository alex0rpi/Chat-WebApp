// This input component will be visible:
// at welcome chat once the user is identified
// at a room chat

import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Button } from 'react-bootstrap';

// type Props = {}

const ConnectedUsersBox = () => {
  const { appState, appDispatch } = useContext(SocketContext);
  useEffect(() => {
    async function getUsers() {
      const response = await fetch('/api/users');
      const data = await response.json();
      console.log(data);
      let list: string[] = [];
      data.map((userObj: { username: string }) => (list = [...list, userObj.username]));
      appDispatch({ type: 'update_users', payload: list });
      console.log(appState.users);
    }
    getUsers();
  }, []);
  return (
    <div className="user-list">
      <h6>Connected Users</h6>
      <div className="user-list-content">
        {/* {appState.users.map((user, index) => (
        <p key={index} className="user-list-item">
        {`👷‍♀️${user}`}
        </p>
      ))} */}
        <div className="d-grid gap-1">
          <Button variant="warning" size="sm">
            My_user
          </Button>
          <Button variant="secondary" size="sm">
            User_1
          </Button>
          <Button variant="secondary" size="sm">
            User_2
          </Button>
          <Button variant="secondary" size="sm">
            User_3
          </Button>
          <Button variant="secondary" size="sm">
            User_4
          </Button>
          <Button variant="secondary" size="sm">
            User_5
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectedUsersBox;
