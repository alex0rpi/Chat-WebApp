// This input component will be visible:
// at welcome chat once the user is identified
// at a room chat

import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

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
      {appState.users.map((user, index) => (
        <p key={index} className="user-list-item">
          {`👷‍♀️${user}`}
        </p>
      ))}
    </div>
  );
};

export default ConnectedUsersBox;
