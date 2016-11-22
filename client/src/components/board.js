import React from 'react';
import io from 'socket.io-client';
import page from 'page';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WebRTC from '../lib/webrtc';
import API from '../lib/api';
import Canvas from './whiteboard/Canvas';
import Whiteboard from './whiteboard';
import TextEditor from './text-editor';
import actionCreators from '../data/actions';
import TextChat from './textchat';

const mapStateToProps = state => ({
  currentTeam: state.currentTeam,
  connectedUsers: state.connectedUsers,
  canvasState: state.canvasState,
  editorState: state.editorState,
  socketName: state.socketName,
  socket: state.socket,
  display: state.display,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ TEXT_CHANGE: actionCreators.TEXT_CHANGE }, dispatch);

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: <div />,
      socket: null,
      canvasState: null,
      editorState: null,
      messages: [],
    };
    this.submitMessage = this.submitMessage.bind(this);

    this.componentDidMount = this.componentWillReceiveProps = (newProps) => {
      if (!this.state.socket) {
        const uid = this.props.uid || (newProps && newProps.uid) || null;
        if (uid) {
          API.getBoard(uid)
          .then(() => {
            const socket = io(`/${uid}`);

            const user = (Math.floor(Math.random() * 100)).toString();

            socket.on('incoming chat', (message) => {
              this.state.messages.push(message);
              this.setState({ messages: this.state.messages });
              if (!this.state.displayChat) {
                alert('Open your chat window');
              }
            });

            const canvas = new Canvas();

            const whiteboard = <Whiteboard socket={socket} canvasState={canvas} />;
            const texteditor = <TextEditor socket={socket} />;
            this.setState({
              display: whiteboard,
              cavasState: canvas,
              displayChat: false,
              user,
              socket,
              whiteboard,
              texteditor,
            });
            canvas.on('figureEnd', (figure) => {
              socket.emit('add figure', figure.serialize());
            });
            socket.on('add figure', (figure) => {
              canvas.addFigure(figure);
            });
            socket.on('serve text', (text) => {
              console.log('serving text!!!');
              this.props.SERVE_TEXT(text);
            });
            // this.state.unsubscribe = reduxStore.subscribe(() => {
            //   const currentState = reduxStore.getState();
            //   console.log('updating store');
            //   this.setState({
            //     display: currentState.display,
            //     canvasState: currentState.canvasState,
            //     socket: currentState.socket,
            //     socketName: currentState.socketName,
            //     whiteboard: currentState.canvasState,
            //     texteditor: currentState.editorState,
            //   });
            // });
          })
          .catch(() => {
            // console.err(err);
          });
        } else {
          API.createBoard()
          .then((board) => {
            page(`/boards/${board.uid}`);
          });
        }
      }
    };
  }

  submitMessage(message) {
    this.state.socket.emit('chat sent', message);
  }

  render() {
    const exportCanvas = function exportCanvas() {
      const exportedImage = document.getElementById('whiteboard').toDataURL();
      window.open(exportedImage);
    };
    const toggleWindow = function toggleWindow(id) {
      const element = document.getElementById(id);
      if (element.style.display === 'block') {
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    };
    $(document).ready(() => {
      $('.dropdown-button').dropdown();
      $('.modal').modal();
      WebRTC(this.props.uid);
    });
    return (
      <div>
        <ul id="color-dropdown" className="dropdown-content">
          <li><a onClick={() => { this.state.cavasState.prop('color', 'red'); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('color', 'orange'); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('color', 'yellow'); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('color', 'green'); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('color', 'blue'); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('color', 'purple'); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('color', 'black'); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('color', 'white'); }}><i className="material-icons tools">lens</i></a></li>
        </ul>
        <ul id="marker-dropdown" className="dropdown-content">
          <li><a onClick={() => { this.state.cavasState.prop('lineWidth', 5); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('lineWidth', 15); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('lineWidth', 25); }}><i className="material-icons tools">lens</i></a></li>
        </ul>
        <ul id="tool-dropdown" className="dropdown-content">
          <li><a href="#!"><i className="material-icons tools">undo</i></a></li>
          <li><a href="#!"><i className="material-icons tools">redo</i></a></li>
          <li><a href="#modal1"><i className="material-icons tools">link</i></a></li>
          <li><a onClick={exportCanvas}><i className="material-icons tools">save</i></a></li>
          <li><a onClick={() => { toggleWindow('video-chat'); }} id="display-video-chat">
            <i className="material-icons tools">voice_chat</i></a></li>
          <li><a
            onClick={() => this.setState({ displayChat: !this.state.displayChat })}
            id="display-text-chat"
          >
            <i className="material-icons tools">chat</i></a></li>
        </ul>
        <nav className="grey darken-3">
          <div className="nav-wrapper container">
            <a href="/boards" className="brand-logo left hide-on-small-and-down">
              CollaBoard
            </a>
            <ul className="right">
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.state.socket) {
                      this.setState({
                        display: this.state.texteditor,
                      });
                    }
                  }}
                >Text Editor</a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.state.socket) {
                      this.setState({
                        display: this.state.whiteboard,
                      });
                    }
                  }}
                >Whiteboard</a>
              </li>
              <li>
                <a
                  className="dropdown-button"
                  href="#!"
                  data-activates="color-dropdown"
                  data-beloworigin="true"
                  data-constrainwidth="false"
                ><i className="material-icons">palette</i></a>
              </li>
              <li>
                <a
                  className="dropdown-button"
                  href="#!"
                  data-activates="marker-dropdown"
                  data-beloworigin="true"
                  data-constrainwidth="false"
                ><i className="material-icons">mode_edit</i></a>
              </li>
              <li>
                <a
                  className="dropdown-button"
                  href="#!"
                  data-activates="tool-dropdown"
                  data-beloworigin="true"
                  data-constrainwidth="false"
                ><i className="material-icons">build</i></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="workspace">
          {this.state.display}
          {this.state.displayChat ? <TextChat
            messages={this.state.messages}
            user={this.state.user}
            submitMessage={this.submitMessage}
          /> : undefined }
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            Copy this link to your clipboard to share:
            <input readOnly value={`http://localhost:4000/${this.props.uid}`} />
          </div>
        </div>
        <div id="video-chat">
          <video id="video-container" />
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  uid: React.PropTypes.string,
  TEXT_CHANGE: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
