import React from 'react';

const TextChatFeed = props => (
  <div className="chatMessage">
    <div className="chatMessageUser">{props.user}</div>
    <div className="chatMessageText">{props.message}</div>
  </div>
);

export default TextChatFeed;
