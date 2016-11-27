import React from 'react';
import io from 'socket.io-client';
import page from 'page';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Canvas from 'collaboard-canvas';

import WebRTC from '../lib/webrtc';
import API from '../lib/api';
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
  bindActionCreators({ SERVE_TEXT: actionCreators.SERVE_TEXT }, dispatch);

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: <div />,
      socket: null,
      canvasState: null,
      editorState: null,
      messages: [],
      flash: false,
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
                this.setState({ flash: true });
              }
              const textFeed = document.getElementById('text-chat-feed');
              textFeed.scrollTop = textFeed.scrollHeight - textFeed.clientHeight;
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
              // console.log('serving text!!!');
              this.props.SERVE_TEXT(text);
            });
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
    const toggleWindow = function toggleWindow(id) {
      const element = document.getElementById(id);
      if (element.style.display === 'block') {
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    };
    let switchButton;
    if (this.state.display === this.state.whiteboard) {
      switchButton = (<li className="switchButton">
        <a
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.state.socket) {
              this.setState({
                display: this.state.texteditor,
              });
            }
            // move the below to a map function or potentially a query selection class
            document.getElementById('color-dropdown-btn').style.display = 'none';
            document.getElementById('size-dropdown-btn').style.display = 'none';
            document.getElementById('undo-btn').style.display = 'none';
            document.getElementById('redo-btn').style.display = 'none';
          }}
        >Text Editor</a>
      </li>);
    } else {
      switchButton = (<li className="switchButton">
        <a
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.state.socket) {
              this.setState({
                display: this.state.whiteboard,
              });
            }
            document.getElementById('color-dropdown-btn').style.display = 'block';
            document.getElementById('size-dropdown-btn').style.display = 'block';
            document.getElementById('undo-btn').style.display = 'block';
            document.getElementById('redo-btn').style.display = 'block';
          }}
        >Whiteboard</a>
      </li>);
    }
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white'];
    $(document).ready(() => {
      $('.dropdown-button').dropdown();
      $('.modal').modal();
      WebRTC(this.props.uid);
      document.getElementById('export-png').addEventListener('click', function download() {
        this.href = document.getElementById('whiteboard').toDataURL();
        this.download = 'collaboard-export.png';
      }, false);
      document.getElementById('build-button').addEventListener('click', () => {
        if (this.state.flash) {
          this.state.flash = false;
        }
      });
    });
    return (
      <div>
        <ul id="color-dropdown" className="dropdown-content">
          {colors.map((color, i) => (
            <li key={i}><a onClick={() => { this.state.cavasState.prop('color', color); }}><i className="material-icons tools">lens</i></a></li>
          ))}
        </ul>
        <ul id="marker-dropdown" className="dropdown-content">
          <li><a onClick={() => { this.state.cavasState.prop('lineWidth', 5); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('lineWidth', 15); }}><i className="material-icons tools">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('lineWidth', 25); }}><i className="material-icons tools">lens</i></a></li>
        </ul>
        <ul id="tool-dropdown" className="dropdown-content">
          <li id="undo-btn"><a href="#!"><i className="material-icons tools">undo</i></a></li>
          <li id="redo-btn"><a href="#!"><i className="material-icons tools">redo</i></a></li>
          <li><a href="#modal1"><i className="material-icons tools">link</i></a></li>
          <li><a href="#!" id="export-png"><i className="material-icons tools">save</i></a></li>
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
              <li id="color-dropdown-btn">
                <a
                  className="dropdown-button"
                  href="#!"
                  data-activates="color-dropdown"
                  data-beloworigin="true"
                  data-constrainwidth="false"
                ><i className="material-icons">palette</i></a>
              </li>
              <li id="size-dropdown-btn">
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
                  id="build-button"
                  href="#!"
                  data-activates="tool-dropdown"
                  data-beloworigin="true"
                  data-constrainwidth="false"
                >{this.state.flash ? <i
                  id="announcement-button"
                  className="material-icons"
                >announcement</i>
                : <i className="material-icons">build</i>
                }
                </a>
              </li>
              {switchButton}
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
            <input readOnly value={`https://localhost:4000/boards/${this.props.uid}`} />
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
  SERVE_TEXT: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
