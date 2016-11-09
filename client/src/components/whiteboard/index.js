const React = require('react');
const Canvas = require('./Canvas');

class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.canvasLoaded1 = this.canvasLoaded1.bind(this);
    this.canvasLoaded2 = this.canvasLoaded2.bind(this);
  }


  canvasLoaded1(canvas) {
    this.canvas1 = new Canvas(canvas, {});
  }

  canvasLoaded2(canvas) {
    this.canvas2 = new Canvas(canvas, {});
  }

  render() {
    const style = { border: '1px solid #000' };
    return (
      <div>
        <canvas
          ref={this.canvasLoaded1}
          id="whiteboard"
          width="500"
          height="500"
          style={style}
        >
          {'It appears your browser doesn\'t support HTML5 Canvas'}
        </canvas>
        <canvas
          ref={this.canvasLoaded2}
          id="whiteboard2"
          width="500"
          height="500"
          style={style}
        >
          {'It appears your browser doesn\'t support HTML5 Canvas'}
        </canvas>
      </div>
    );
  }
}
module.exports = Whiteboard;
