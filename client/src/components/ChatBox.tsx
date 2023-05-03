import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

interface chatBoxProps {
  generalMsg?: string | null;
}

const ChatBox = (props: chatBoxProps) => {
  const { appState } = useContext(SocketContext);

  return (
    <div className="chat-box">
      {props.generalMsg && <p>{props.generalMsg}</p>}
      {appState.messages.map((msg) => (
        <p key={msg.id}>{msg.text}</p>
      ))}
    </div>
  );
};

export default ChatBox;
