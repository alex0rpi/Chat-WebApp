// This input component will be visible:
// at welcome chat once the user is identified
// at a room chat

import UIButton from './UIButton';

// type Props = {}

const MessageInput = () => {
  const handleSendMsg = () => {
    console.log('handleSendMsg');
  };
  return (
    <div className="msg-field">
      <form>
        <input type="text" />
        <UIButton btnText="SEND" clickHandler={handleSendMsg} />
      </form>
    </div>
  );
};

export default MessageInput;
