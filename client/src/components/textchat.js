import React from 'react';

class TextChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      count: 0,
      messages: props.messages,
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    if (this.state.messages.length > this.state.count) {
      this.state.count += 1;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = {
      text: this.state.text,
    };
    this.props.submitMessage(message);
    this.setState({ text: '' });
  }

  changeHandler(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div id="text-chat">
        <div id="text-chat-feed">
          {this.state.messages.map(message =>
           (
             <div className="chatMessage">
               <div className="chatMessageUser">{message.user}</div>
               <div className="chatMessageText">{message.text}</div>
             </div>
      )
    )}
        </div>
        <div id="text-chat-bottom">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              id="text-chat-input"
              type="text"
              onChange={this.changeHandler.bind(this)}
              value={this.state.text}
            />
            <button
              className="sendbtn btn waves-effect waves-light"
              type="submit"
              name="action"
            ><i className="material-icons">send</i></button>
          </form>
        </div>
      </div>
    );
  }
}

TextChat.propTypes = {
};

export default TextChat;
