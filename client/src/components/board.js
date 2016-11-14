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
    return this.state.display;
  }
}

Board.propTypes = {
  uid: React.PropTypes.string,
};

export default Board;
