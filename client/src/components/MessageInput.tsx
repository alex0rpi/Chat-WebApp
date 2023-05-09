// This input component will be visible:
// at welcome chat once the user is identified AND at a room chat
import { useRef, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Button, Form } from 'react-bootstrap';
import { User } from '../models/Interfaces';

interface MessageInputProps {
  currentRoom: string | undefined;
}

const MessageInput = (props: MessageInputProps) => {
  const { appState } = useContext(SocketContext);
  const msgInputRef = useRef<HTMLInputElement>(null);

  const { current_uid, socket } = appState;

  const user = JSON.parse(current_uid) as User;

  const handleSendMsg = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!msgInputRef.current?.value || msgInputRef.current?.value.trim() === '') {
      alert('No message to send!');
      return;
    }
    const data = {
      userId: user.userId,
      roomName: props.currentRoom,
      message: msgInputRef.current?.value,
    };
    console.log(data);
    socket?.emit('new_message', data);
    msgInputRef.current.value = '';
  };
  return (
    <div className="msg-field">
      <Form.Group className="my-0 p-2 d-flex" controlId="">
        <Form.Control ref={msgInputRef} type="text" />
        <Button size="sm" variant="primary" type="submit" onClick={handleSendMsg}>
          Send
        </Button>
      </Form.Group>
    </div>
  );
};

export default MessageInput;
