import React from 'react';
import io from 'socket.io-client';
import page from 'page';

import API from '../lib/api';
import Whiteboard from './whiteboard';
import TextEditor from './text-editor';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: <div />,
      socket: null,
    };

    this.componentDidMount = this.componentWillReceiveProps = (newProps) => {
      if (!this.state.socket) {
        const uid = this.props.uid || (newProps && newProps.uid) || null;
        if (uid) {
          API.getBoard(uid)
          .then(() => {
            const socket = io(`/${uid}`);
            const whiteboard = <Whiteboard socket={socket} />;
            const texteditor = <TextEditor socket={socket} />;
            this.setState({
              display: whiteboard,
              socket,
              whiteboard,
              texteditor,
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
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="/boards" className="brand-logo">
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
            </ul>
          </div>
        </nav>
        <div className="workspace">
          {this.state.display}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  uid: React.PropTypes.string,
};

export default Board;
