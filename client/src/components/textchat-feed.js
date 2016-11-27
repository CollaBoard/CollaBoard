import React from 'react';

const TextChatFeed = props => (
  <div id="text-chat-feed">
    { props.messages.map((message, i) =>
           (
             <div className="chatMessage" key={i}>
               <div className="chatMessageTime">{message.timestamp}</div>
               <div className="chatMessageUser">{message.user}</div>
               <div className="chatMessageText">{message.text}</div>
             </div>
      )
    )}
  </div>
    );

TextChatFeed.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default TextChatFeed;
