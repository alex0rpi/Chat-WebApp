import { useState, MouseEvent } from 'react';
import ContainerChatWindow from '../layout/ContainerChatWindow';
import NewUserInput from '../components/NewUserInput';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';

// type Props = {}

const WelcomeChat = () => {
  const [identified, setIdentified] = useState(true);

  const handleIdChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdentified((prevState) => !prevState);
  };

  return (
    <ContainerChatWindow>
      <div>This is the WelcomeChat</div>
      {!identified ? (
        <>
          <NewUserInput />
          <ChatBox />
          <p>Some additional components will be visible once the user has identified itself</p>
        </>
      ) : (
        <>
          <NewUserInput />
          <ChatBox />
          <MessageInput />
        </>
      )}
      <button onClick={handleIdChange}>ChangeID mode</button>
    </ContainerChatWindow>
  );
};

export default WelcomeChat;
