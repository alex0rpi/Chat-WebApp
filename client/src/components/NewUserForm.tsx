// Only visible at the beggining, once the user enters the app to identify itself.

import { useRef, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import UIButton from './UIButton';
import { FloatingLabel, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';

const NewUserForm = () => {
  const { appDispatch } = useContext(SocketContext);
  const inputRef = useRef<HTMLInputElement>(null);
  //Create a socket instance and store it in a ref (so it survives app re-renders)
  const { current: socket } = useRef(
    io('ws://localhost:5000', { reconnectionAttempts: 5, reconnectionDelay: 5000, autoConnect: false })
  );
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
    const data = await response.json();
    console.log(data);
    appDispatch({ type: 'update_users', payload: data.user });
    // user was created or an existing user active status was updated and context as well.
    /* INIT THE SOCKET, connect to the server and provide this socket to
   the context so that it can be used by the child components. */

    appDispatch({ type: 'update_uid', payload: data.user.id });
    // update the uid in the context for the current user.
    socket.connect(); // connect to the socket server
    socket.emit('connection');
    appDispatch({ type: 'update_socket', payload: socket }); // update the socket in the context
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
