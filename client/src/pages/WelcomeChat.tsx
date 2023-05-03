import ContainerChatWindow from '../layout/ContainerChatWindow';
import NewUserForm from '../components/NewUserForm';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import RoomListBox from '../components/RoomListBox';
import ConnectedUsersBox from '../components/ConnectedUsersBox';
import Header_bar from '../components/Header_bar';
import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

// type Props = {}

const WelcomeChat = () => {
  const { appState, appDispatch } = useContext(SocketContext);
  const [showToast, setShowToast] = useState(false);
  const [generalMsg, setGeneralMsg] = useState(null);
  const toggleShowToast = () => setShowToast(!showToast);

  const handleExit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('exit button clicked');
    appDispatch({ type: 'remove_socket', payload: null });
    appDispatch({ type: 'remove_user', payload: null });
    const response = await fetch(`/api/user/${appState.uid}`, {
      method: 'PATCH',
    });
    appState.socket?.disconnect();
    if (response.ok) {
      console.log('user disconnected');
      toggleShowToast();
    }
  };

  appState.socket?.on('message', ({ updatedUsers, message }) => {
    appDispatch({ type: 'update_users', payload: updatedUsers });
    setGeneralMsg(message);
  });
  return (
    <ContainerChatWindow>
      <Header_bar />
      {!appState.socket ? (
        <>
          <NewUserForm />
          {showToast && (
            <ToastContainer className="p-3 toast" position={'top-center'}>
              <Toast show={showToast} onClose={toggleShowToast}>
                <Toast.Header>
                  <p>✅</p>
                  <strong className="me-auto">Message</strong>
                  <small>Just now</small>
                </Toast.Header>
                <Toast.Body>You're disconnected, bye👋🏻 bye👋🏻!</Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </>
      ) : (
        <>
          <div className="exit-btn">
            <Button onClick={handleExit}>Disconnect</Button>
          </div>
          <ChatBox generalMsg={generalMsg} />
          <ConnectedUsersBox welcomeChatUsers={appState.logged_users} />
          <RoomListBox />
          <MessageInput />
        </>
      )}
    </ContainerChatWindow>
  );
};

export default WelcomeChat;
