// This component will only be visible at the welcome chat, once the user is identified.
import { useRef } from 'react';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Socket } from 'socket.io-client';
import { Room } from '../Interfaces/Interfaces';

interface NewRoomFormProps {
  socket: Socket | undefined;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const NewRoomForm = (props: NewRoomFormProps) => {
  const { socket } = props;

  const roomRef = useRef<HTMLInputElement>(null);

  const handleRoomCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newRoomInput: string = roomRef.current?.value || '';
    if (newRoomInput.trim() === '') {
      roomRef.current!.value = '';
      alert('No room name to create❓❗');
      return;
    }
    if (newRoomInput !== null) {
      const newRoomName = roomRef.current?.value;
      socket?.emit('create_room', newRoomName);
      // reset the newRoomInput field
      roomRef.current!.value = '';
    }
  };

  return (
    <div className="room-field">
      <Form.Group>
        <div className="d-grid gap-1 d-flex">
          <Form.Control
            ref={roomRef}
            type="text"
            className="p-1 mx-0"
            placeholder="Add new room"
          />
          <Button
            type="submit"
            variant="danger"
            className="m-0"
            size="sm"
            onClick={handleRoomCreate}
          >
            ➕
          </Button>
        </div>
      </Form.Group>
    </div>
  );
};

export default NewRoomForm;
