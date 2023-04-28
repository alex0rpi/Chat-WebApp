import ContainerChatWindow from '../layout/ContainerChatWindow';
import NewUserInput from '../components/NewUserInput';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import RoomListBox from '../components/RoomListBox';
import ConnectedUsersBox from '../components/ConnectedUsersBox';
import Header_bar from '../components/Header_bar';

// type Props = {}

const WelcomeChat = () => {
  return (
    <ContainerChatWindow>
      <Header_bar />
      <NewUserInput />
      <ConnectedUsersBox />
      <RoomListBox />
      <ChatBox />
      <MessageInput />
    </ContainerChatWindow>
  );
};

export default WelcomeChat;
