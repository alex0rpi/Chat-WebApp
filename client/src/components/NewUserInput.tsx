// Only visible at the beggining, once the user enters the app to identify itself.

import { useRef, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import UIButton from './UIButton';
import { User } from '../models/Interfaces';

// type Props = {}

const NewUserInput = () => {
  const { appDispatch } = useContext(SocketContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUserEnter = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line no-debugger
    event.preventDefault();
    if (!inputRef.current?.value) {
      alert('Please enter a name (≧▽≦)'); //later it could be a toast
      return;
    }
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: inputRef.current.value }),
    });
    const data: User = await response.json();
    console.log(data)
    appDispatch({ type: 'update_users', payload: data.username }); // revisar esto
    alert('user was added😁😀');
  };

  return (
    <div className="name-field">
      <input ref={inputRef} type="text" placeholder="Prince of all Sayans" />
      <UIButton btnText="ENTER" clickHandler={handleUserEnter} />
    </div>
  );
};

export default NewUserInput;
