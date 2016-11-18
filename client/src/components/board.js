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
        <ul id="marker-dropdown" className="dropdown-content">
          <li><a onClick={() => { this.state.cavasState.prop('lineWidth', 5); }}><i className="material-icons tools marker1">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('lineWidth', 15); }}><i className="material-icons tools marker2">lens</i></a></li>
          <li><a onClick={() => { this.state.cavasState.prop('lineWidth', 25); }}><i className="material-icons tools marker3">lens</i></a></li>
        </ul>
        <ul id="tool-dropdown" className="dropdown-content">
          <li><a href="#!"><i className="material-icons tools">undo</i></a></li>
          <li><a href="#!"><i className="material-icons tools">redo</i></a></li>
          <li><a href="#modal1"><i className="material-icons tools">link</i></a></li>
          <li><a onClick={exportCanvas}><i className="material-icons tools">save</i></a></li>
          <li><a onClick={displayChat} id="open-or-join">
            <i className="material-icons tools">voice_chat</i></a></li>
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
