import { useState, MouseEvent } from 'react';
import GlobalChatWindow from '../layout/GlobalChatWindow';
import NewUserInput from '../components/NewUserInput';

// type Props = {}

const WelcomeChat = () => {
  const [identified, setIdentified] = useState(false);

  const handleIdChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdentified((prevState) => !prevState);
  };

  return (
    <GlobalChatWindow>
      <div>This is the WelcomeChat</div>
      {identified ? (
        <p>Some additional components will be visible once the user has identified itself</p>
      ) : (
        <NewUserInput/>
      )
      }
      <p>With all its necessary components imported</p>
      <button onClick={handleIdChange}>ChangeID mode</button>
    </GlobalChatWindow>
  );
};

export default WelcomeChat;
