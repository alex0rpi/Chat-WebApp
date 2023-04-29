// This component will only be visible at the welcome chat, once the user is identified.
import React from 'react';
import NewRoomForm from './NewRoomForm';

// type Props = {}

const RoomListBox = () => {
  return (
    <div className="room-list">
      <h6>Room_List↓↓</h6>
      <NewRoomForm />
    </div>
  );
};

export default RoomListBox;
