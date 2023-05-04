// Only visible at the beggining, once the user enters the app to identify itself.

import { useRef, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import UIButton from './UIButton';
import { FloatingLabel, Form } from 'react-bootstrap';
import { socket } from '../socket';

const NewUserForm = () => {
  const { dispatch } = useContext(SocketContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUserEnter = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!inputRef.current?.value) {
      alert('Please enter a name (≧▽≦)'); //later it could be a toast
      return;
    }
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: inputRef.current.value }),
    });
    if (response.ok) {
      // Extract info from the socket event we receive from the server
      socket.connect();
      dispatch({ type: 'update_socket', payload: socket });
      socket.emit('join', { username: inputRef.current.value, room: 'welcome' });
      socket.on('userList', ({ users }) => {
        dispatch({ type: 'update_logged_users', payload: users });
      });
    }
  };

  return (
    <div className="name-field">
      <FloatingLabel controlId="floatingInput" label="Your username" className="mb-2 p-0">
        <Form.Control ref={inputRef} type="username" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel className="d-flex" controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
        <UIButton btnText="ENTER" clickHandler={handleUserEnter} />
      </FloatingLabel>
    </div>
  );
};

export default NewUserForm;
