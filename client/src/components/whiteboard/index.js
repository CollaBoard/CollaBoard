const React = require('react');
const io = require('socket.io-client');
const Canvas = require('./Canvas');

class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
    };

    this.state.socket.on('add figure', (figure) => {
      this.canvas.addFigure(figure);
    });
    this.canvasLoaded = this.canvasLoaded.bind(this);
  }

  canvasLoaded(canvas) {
    this.canvas = new Canvas(canvas, {});
    this.canvas.on('figureEnd', (figure) => {
      this.state.socket.emit('add figure', figure.serialize());
    });
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasLoaded}
          id="whiteboard"
          width="1280"
          height="740"
        >
          {'It appears your browser doesn\'t support HTML5 Canvas'}
        </canvas>
        <div className="circular-menu" id="context-menu">
          <div className="circle" id="circle">
            <a onClick={() => { this.canvas.prop('color', 'red'); }}>
              <i className="material-icons redBubble">lens</i></a>
            <a onClick={() => { this.canvas.prop('color', 'orange'); }}>
              <i className="material-icons orangeBubble">lens</i></a>
            <a onClick={() => { this.canvas.prop('color', 'yellow'); }}>
              <i className="material-icons yellowBubble">lens</i></a>
            <a onClick={() => { this.canvas.prop('color', 'green'); }}>
              <i className="material-icons greenBubble">lens</i></a>
            <a onClick={() => { this.canvas.prop('color', 'blue'); }}>
              <i className="material-icons blueBubble">lens</i></a>
            <a onClick={() => { this.canvas.prop('color', 'purple'); }}>
              <i className="material-icons purpleBubble">lens</i></a>
            <a onClick={() => { this.canvas.prop('color', 'black'); }}>
              <i className="material-icons blackBubble">lens</i></a>
            <a onClick={() => { this.canvas.prop('color', 'white'); }}>
              <i className="material-icons whiteBubble">lens</i></a>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Whiteboard;
