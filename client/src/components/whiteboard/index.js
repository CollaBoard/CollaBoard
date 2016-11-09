const React = require('react');
const Canvas = require('./Canvas');

class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.canvasLoaded = this.canvasLoaded.bind(this);
  }


  canvasLoaded(canvas) {
    this.canvas = new Canvas(canvas, {});
  }

  render() {
    return (
      <canvas
        ref={this.canvasLoaded}
        id="whiteboard"
        width="500"
        height="500"
      >
        {'It appears your browser doesn\'t support HTML5 Canvas'}
      </canvas>
    );
  }
}
module.exports = Whiteboard;
