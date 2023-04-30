// This input component will be visible:
// at welcome chat once the user is identified AND at a room chat
import { useRef, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import UIButton from './UIButton';
import { Message } from '../models/Interfaces';
import { Form } from 'react-bootstrap';
// type Props = {}

const MessageInput = () => {
  const { appDispatch } = useContext(SocketContext);

  const msgInputRef = useRef<HTMLInputElement>(null);

  const handleSendMsg = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line no-debugger
    event.preventDefault();
    if (!msgInputRef.current?.value) {
      alert('Please enter a name (≧▽≦)'); //later it could be a toast
      return;
    }
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: msgInputRef.current.value }),
    });
    const data: Message = await response.json();
    console.log(data);
    // appDispatch({ type: 'update_users', payload: data.text }); // revisar esto
    alert('message was SENT😀');
  };
  return (
    <div className="msg-field">
      <Form.Group className="my-0 p-2 d-flex" controlId="">
        <Form.Control ref={msgInputRef} type="text" />
        <UIButton btnText="SEND" clickHandler={handleSendMsg} />
      </Form.Group>
    </div>
  );
};

export default MessageInput;
