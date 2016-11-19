import React from 'react';
import TextChatFeed from './textchat-feed';

class TextChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: props.messages,
      user: props.user,
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
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
      <div id="text-chat">
        <TextChatFeed messages={this.state.messages} />
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
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  submitMessage: React.PropTypes.function,
  user: React.PropTypes.string,
};

export default TextChat;
