import React from 'react';
import io from 'socket.io-client';
import page from 'page';

import WebRTC from '../lib/webrtc';
import API from '../lib/api';
import Canvas from './whiteboard/Canvas';
import Whiteboard from './whiteboard';
import TextEditor from './text-editor';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: <div />,
      socket: null,
      canvasState: null,
    };

    this.componentDidMount = this.componentWillReceiveProps = (newProps) => {
      if (!this.state.socket) {
        const uid = this.props.uid || (newProps && newProps.uid) || null;
        if (uid) {
          API.getBoard(uid)
          .then(() => {
            const socket = io(`/${uid}`);
            const canvas = new Canvas();
            const whiteboard = <Whiteboard socket={socket} canvasState={canvas} />;
            const texteditor = <TextEditor socket={socket} />;
            this.setState({
              display: whiteboard,
              cavasState: canvas,
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
          })
          .catch(console.err);
        } else {
          API.createBoard()
          .then((board) => {
            page(`/boards/${board.uid}`);
          });
        }
      }
    };
  }

  render() {
    const exportCanvas = function exportCanvas() {
      const exportedImage = document.getElementById('whiteboard').toDataURL();
      window.open(exportedImage);
    };
    const displayChat = function displayChat() {
      document.getElementById('videoChat').style.display = 'block';
    };
    $(document).ready(() => {
      $('.dropdown-button').dropdown();
      $('.modal').modal();
      WebRTC(this.props.uid);
    });
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a href="#!"><i className="material-icons">undo</i></a></li>
          <li><a href="#!"><i className="material-icons">redo</i></a></li>
          <li><a href="#modal1"><i className="material-icons">link</i></a></li>
          <li><a onClick={exportCanvas}><i className="material-icons">save</i></a></li>
          <li><a onClick={displayChat} id="open-or-join">
            <i className="material-icons">voice_chat</i></a></li>
        </ul>
        <nav>
          <div className="nav-wrapper">
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
                  data-activates="dropdown1"
                  data-beloworigin="true"
                ><i className="material-icons">arrow_drop_down</i></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="workspace">
          {this.state.display}
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            Copy this link to your clipboard to share:
            <input readOnly value={`http://localhost:4000/${this.props.uid}`} />
          </div>
        </div>
        <div id="videoChat">
          <video id="video-container" />
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  uid: React.PropTypes.string,
};

export default Board;
