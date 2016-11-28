import React from 'react';
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
    // const move = (function () {
    //   return {
    //     move: (divid, xpos, ypos) => {
    //       document.getElementById(divid).style.left = `${xpos}px`;
    //       document.getElementById(divid).style.top = `${ypos}px`;
    //     },
    //     startMoving: (e = window.event) => {
    //       const posX = e.clientX;
    //       const posY = e.clientY;
    //       let divTop = document.getElementById('text-chat').style.top;
    //       let divLeft = document.getElementById('text-chat').style.left;
    //       divTop = divTop.replace('px', '');
    //       divLeft = divLeft.replace('px', '');
    //       const diffX = posX - divLeft;
    //       const diffY = posY - divTop;
    //       document.onmousemove = function onmousemove(ev = window.event) {
    //         const posX2 = ev.clientX;
    //         const posY2 = ev.clientY;
    //         const aX = posX2 - diffX;
    //         const aY = posY2 - diffY;
    //         move.move('text-chat', aX, aY);
    //       };
    //     },
    //     stopMoving: function stopMoving() {
    //       document.onmousemove = function onmousemove() {};
    //     },
    //   };
    // }());
    return (
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
