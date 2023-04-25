import { useState, MouseEvent } from 'react';

// type Props = {}

const WelcomeChat = () => {
  const [identified, setIdentified] = useState(false);

  const handleIdChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdentified((prevState) => !prevState);
  };
  return (
    <>
      <div>This is the WelcomeChat</div>
      {identified ? (
        <p>Some additional components will be visible once the user has identified itself</p>
      ) : (
        <p>Only the chat itself and an id form will be visible in no-id state</p>
      )}
      <p>With all its necessary components imported</p>
      <button onClick={handleIdChange}>ChangeID mode</button>
    </>
  );
};

export default WelcomeChat;
