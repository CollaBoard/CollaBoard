import React from 'react';
import Draggable from 'react-draggable';
import TextChatFeed from './textchat-feed';

class TextChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      user: props.user,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = {
      text: this.state.text,
      user: this.state.user,
    };
    this.props.submitMessage(message);
    this.setState({ text: '' });
  }

  changeHandler(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <Draggable>
        <div id="text-chat">
          <div id="close"><a onClick={this.props.closeWindow}>x</a></div>
          <TextChatFeed messages={this.props.messages} />
          <div id="text-chat-bottom">
            <form onSubmit={this.handleSubmit}>
              <input
                id="text-chat-input"
                type="text"
                onChange={this.changeHandler}
                value={this.state.text}
              />
              <button
                className="grey darken-1 btn btn-floating"
                type="submit"
                name="action"
              ><i className="material-icons">send</i></button>
            </form>
          </div>
        </div>
      </Draggable>
    );
  }
}

TextChat.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  submitMessage: React.PropTypes.func,
  user: React.PropTypes.string,
  closeWindow: React.PropTypes.func,
};

export default TextChat;
