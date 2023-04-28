// This input component will be visible:
// at welcome chat once the user is identified
// at a room chat

import React from 'react';

// type Props = {}

const MessageInput = () => {
  return (
    <form className="msg-field">
      <input type="text" />
      <button type="submit">SEND</button>
    </form>
  );
};

export default MessageInput;
