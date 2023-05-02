// This component will only be visible at the welcome chat, once the user is identified.
import NewRoomForm from './NewRoomForm';
import { Button } from 'react-bootstrap';

// type Props = {}

const RoomListBox = () => {
  return (
    <div className="room-list">
      <h6>Rooms</h6>
      <div className="room-list-content">
        <div className="d-grid gap-1">
          <Button variant="secondary" size="sm">
            This is a room
          </Button>
          <Button variant="primary" size="sm">
            The current room
          </Button>
          <Button variant="secondary" size="sm">
            Another room
          </Button>
          <Button variant="secondary" size="sm">
            Yer another room
          </Button>
        </div>
        <NewRoomForm />
      </div>
    </div>
  );
};

export default RoomListBox;
