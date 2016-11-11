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
    this.canvas1.on('figureEnd', (figure) => {
      this.canvas2.addFigure(figure.serialize());
    });
  }

  canvasLoaded2(canvas) {
    this.canvas2 = new Canvas(canvas, {});
    this.canvas2.on('figureEnd', (figure) => {
      this.canvas1.addFigure(figure.serialize());
    });
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
        <div className="circular-menu" id="context-menu">
          <div className="circle" id="circle">
            <a onClick={() => { this.canvas1.prop('color', 'red'); }}>
              <i className="material-icons redBubble">lens</i></a>
            <a onClick={() => { this.canvas1.prop('color', 'orange'); }}>
              <i className="material-icons orangeBubble">lens</i></a>
            <a onClick={() => { this.canvas1.prop('color', 'yellow'); }}>
              <i className="material-icons yellowBubble">lens</i></a>
            <a onClick={() => { this.canvas1.prop('color', 'green'); }}>
              <i className="material-icons greenBubble">lens</i></a>
            <a onClick={() => { this.canvas1.prop('color', 'blue'); }}>
              <i className="material-icons blueBubble">lens</i></a>
            <a onClick={() => { this.canvas1.prop('color', 'purple'); }}>
              <i className="material-icons purpleBubble">lens</i></a>
            <a onClick={() => { this.canvas1.prop('color', 'black'); }}>
              <i className="material-icons blackBubble">lens</i></a>
            <a onClick={() => { this.canvas1.prop('color', 'white'); }}>
              <i className="material-icons whiteBubble">lens</i></a>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Whiteboard;
