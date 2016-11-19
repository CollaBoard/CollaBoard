import React from 'react';

class TextChatFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillUpdate() {
  }

  render() {
    return (
      <div id="text-chat-feed">
        { this.props.messages.map((message, i) =>
           (
             <div className="chatMessage" key={i}>
               <div className="chatMessageUser">{message.user}</div>
               <div className="chatMessageText">{message.text}</div>
             </div>
      )
    )}
      </div>
    );
  }
}

TextChatFeed.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default TextChatFeed;
