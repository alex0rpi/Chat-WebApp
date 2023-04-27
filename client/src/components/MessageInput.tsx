// This input component will be visible:
// at welcome chat once the user is identified
// at a room chat

import React from 'react';
import classes from './compCSS/MessageInput.module.css'

// type Props = {}

const MessageInput = () => {
  return (
    <form className={classes.messageForm}>
      <input type="text"  />
      <button type="submit">SEND</button>
    </form>
  );
};

export default MessageInput;
