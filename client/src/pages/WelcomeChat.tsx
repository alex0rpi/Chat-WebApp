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

// type Props = {}

const WelcomeChat = () => {
  const { appState, appDispatch } = useContext(SocketContext);
  const handleExit = () => {
    console.log('exit button clicked');
    appDispatch({ type: 'remove_socket', payload: null });
  };
  return (
    <ContainerChatWindow>
      <Header_bar />
      {!appState.socket ? (
        <NewUserForm />
      ) : (
        <>
          <div className="exit-btn">
            <Button onClick={handleExit}>Disconnect</Button>
          </div>
          <ConnectedUsersBox />
          <RoomListBox />
          <MessageInput />
        </>
      )}
      <ChatBox />
    </ContainerChatWindow>
  );
};

export default WelcomeChat;
