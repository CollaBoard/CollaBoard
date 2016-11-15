const React = require('react');

class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.canvasLoaded = this.canvasLoaded.bind(this);
  }

  canvasLoaded(canvas) {
    if (canvas) {
      this.props.canvasState.attachToElement(canvas);
    } else {
      this.props.canvasState.detachElement();
    }
  }

  render() {
    return (
      <div className="canvasWrapper">
        <canvas
          ref={this.canvasLoaded}
          className="whiteboard"
          width="1280"
          height="740"
        >
          {'It appears your browser doesn\'t support HTML5 Canvas'}
        </canvas>
        <div className="circular-menu" id="context-menu">
          <div className="circle" id="circle">
            <a onClick={() => { this.state.canvas.prop('color', 'red'); }}>
              <i className="material-icons redBubble">lens</i></a>
            <a onClick={() => { this.state.canvas.prop('color', 'orange'); }}>
              <i className="material-icons orangeBubble">lens</i></a>
            <a onClick={() => { this.state.canvas.prop('color', 'yellow'); }}>
              <i className="material-icons yellowBubble">lens</i></a>
            <a onClick={() => { this.state.canvas.prop('color', 'green'); }}>
              <i className="material-icons greenBubble">lens</i></a>
            <a onClick={() => { this.state.canvas.prop('color', 'blue'); }}>
              <i className="material-icons blueBubble">lens</i></a>
            <a onClick={() => { this.state.canvas.prop('color', 'purple'); }}>
              <i className="material-icons purpleBubble">lens</i></a>
            <a onClick={() => { this.state.canvas.prop('color', 'black'); }}>
              <i className="material-icons blackBubble">lens</i></a>
            <a onClick={() => { this.state.canvas.prop('color', 'white'); }}>
              <i className="material-icons whiteBubble">lens</i></a>
          </div>
        </div>
      </div>
    );
  }
}
Whiteboard.propTypes = {
  canvasState: React.PropTypes.shape({
    attachToElement: React.PropTypes.func.isRequired,
    detachElement: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default Whiteboard;
