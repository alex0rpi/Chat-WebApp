// This component will only be visible at the welcome chat, once the user is identified.
import { useRef } from 'react';
import React from 'react';
import UIButton from './UIButton';

// type Props = {}

const NewRoomForm = () => {
  const roomRef = useRef<HTMLInputElement>(null);
  const handleRoomCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('room created');
  };
  return (
    <div className="name-field">
      <input ref={roomRef} type="text" placeholder="Prince of all Sayans" />
      <UIButton btnText="Create Room" clickHandler={handleRoomCreate} />
    </div>
  );
};

export default NewRoomForm;
