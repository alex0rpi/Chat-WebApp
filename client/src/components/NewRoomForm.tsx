// This component will only be visible at the welcome chat, once the user is identified.
import { useRef } from 'react';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

// type Props = {}

const NewRoomForm = () => {
  const roomRef = useRef<HTMLInputElement>(null);
  const handleRoomCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('room created');
  };
  return (
    <div className="room-field">
      <Form.Group>
        <div className="d-grid gap-1 d-flex">
          <Form.Control ref={roomRef} type="text" className='p-1 mx-0' placeholder='Add room'/>
          <Button variant="danger" className='m-0' size="sm" onClick={handleRoomCreate}>
            +
          </Button>
        </div>
      </Form.Group>
    </div>
  );
};

export default NewRoomForm;
