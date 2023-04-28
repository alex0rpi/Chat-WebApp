import ContainerChatWindow from '../layout/ContainerChatWindow';
import NewUserInput from '../components/NewUserInput';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import RoomListBox from '../components/RoomListBox';
import ConnectedUsersBox from '../components/ConnectedUsersBox';

// type Props = {}

const WelcomeChat = () => {
  return (
    <ContainerChatWindow>
      <h1>This is the WelcomeChat</h1>
      <NewUserInput />
      <ChatBox />
      <MessageInput />
      <RoomListBox />
      <ConnectedUsersBox />
    </ContainerChatWindow>
  );
};

export default WelcomeChat;
