import ContainerChatWindow from '../layout/ContainerChatWindow';
import NewUserForm from '../components/NewUserForm';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import RoomListBox from '../components/RoomListBox';
import ConnectedUsersBox from '../components/ConnectedUsersBox';
import Header_bar from '../components/Header_bar';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Button } from 'react-bootstrap';

const WelcomeChat = () => {
  const { appState, dispatch } = useContext(SocketContext);

  const handleExit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    appState.socket?.disconnect();
    dispatch({ type: 'remove_user', payload: null });
  };

  return (
    <ContainerChatWindow>
      <Header_bar />
      {!appState.socket ? (
        <>
          <NewUserForm />
        </>
      ) : (
        <>
          <div className="exit-btn">
            <Button onClick={handleExit}>Disconnect</Button>
          </div>
          <ChatBox />
          <ConnectedUsersBox />
          <RoomListBox />
          <MessageInput />
        </>
      )}
    </ContainerChatWindow>
  );
};

export default WelcomeChat;
