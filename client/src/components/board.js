import React from 'react';
import io from 'socket.io-client';
import page from 'page';

import API from '../lib/api';
import Whiteboard from './whiteboard';
import TextEditor from './text-editor';
import Link from './link';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: <div />,
      socket: null,
    };
  }

  componentDidMount() {
    if (this.props.uid) {
      API.getBoard(this.props.uid)
        .then(() => {
          const socket = io(`/${this.props.uid}`);
          this.setState({ socket, display: <Whiteboard socket={socket} /> });
        })
        .catch(console.err);
    } else {
      API.createBoard()
        .then((board) => {
          page(`/boards/${board.uid}`);
        });
    }
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
                    this.setState({
                      display: <TextEditor socket={this.state.socket} />,
                    });
                  }}
                >Text Editor</a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({
                      display: <Whiteboard socket={this.state.socket} />,
                    });
                  }}
                >Whiteboard</a>
              </li>
            </ul>
          </div>
        </nav>
        {this.state.display}
      </div>
    );
  }
}

Board.propTypes = {
  uid: React.PropTypes.string,
};

export default Board;
