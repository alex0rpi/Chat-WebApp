import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import RoomListBox from '../components/RoomListBox';
import ConnectedUsersBox from '../components/ConnectedUsersBox';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Button } from 'react-bootstrap';
import ContainerChatWindow from '../layout/ContainerChatWindow';

const WelcomeChat = () => {
  const { appState, dispatch } = useContext(SocketContext);

  const handleExit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    appState.socket?.disconnect();
    dispatch({ type: 'remove_user', payload: null });
  };

  return (
    <ContainerChatWindow>
      <div className="exit-btn">
        <Button onClick={handleExit}>Disconnect</Button>
      </div>
      <ChatBox />
      <ConnectedUsersBox />
      <RoomListBox />
      <MessageInput />
    </ContainerChatWindow>
  );
};

export default WelcomeChat;
