const React = require('react');

const Line = function Line(startX = 0, startY = 0, options) {
  this.type = 'Line';
  this.finalized = false;
  const defaults = {
    lineWidth: 5,
    color: '#000',
    lineCap: 'round',
  };
  const config = Object.assign({}, options, defaults);
  let points = [];

  points.push({ x: startX, y: startY });

  this.draw = function draw(context) {
    if (!context) {
      throw new Error('A context must be passed in');
    }

    const ctx = context;

    ctx.lineWidth = config.lineWidth;
    ctx.strokeStyle = config.color;
    ctx.lineCap = config.lineCap;
    ctx.beginPath();
    const initialX = this.finalized ? startX : 0;
    const initialY = this.finalized ? startY : 0;
    ctx.moveTo(startX, startY);
    points.forEach(point => ctx.lineTo(initialX + point.x, initialY + point.y));
    ctx.stroke();
  };

  this.move = function move(x, y) {
    // e is the event object
    points.push({ x, y });
  };

  this.finalize = function finalize() {
    points = points.map(point => ({ x: point.x - startX, y: point.y - startY }));
    this.finalized = true;
  };

  this.serialize = function serialize() {
    return Object.assign({ type: this.type, points }, config);
  };
};

const Canvas = function Canvas(element, options) {
  if (!element || !(element instanceof HTMLCanvasElement)) {
    throw new Error('A canvas DOM element is required');
  }
  // establish default values for common properties
  const defaults = {
    lineWidth: 5,
    color: '#000',
    lineCap: 'round',
  };

  // create config object from defaults and options passed in
  const config = Object.assign({}, defaults, options || {});
  const currentConfig = Object.assign({}, config);

  this.el = element;
  const ctx = this.el.getContext('2d');

  ctx.lineCap = config.lineCap;
  ctx.lineWidth = config.lineWidth;
  ctx.strokeStyle = config.color;

  const renderables = [];
  let undone = [];
  const figures = {
    line: Line,
  };

  let currentFigure = null;
  let selectedFigure = 'line';

  let clicked = false;

  const newFigure = function newFigure(x, y) {
    // empty the stack of undos
    undone = [];
    // create a new figure based on the one that is selected
    // last object is a configuration object
    currentFigure = new figures[selectedFigure](x, y, {});
    renderables.push(currentFigure);
  };


  this.draw = function draw() {
    renderables.forEach((figure) => {
      figure.draw(ctx);
    });

    ctx.lineCap = currentConfig.lineCap;
    ctx.lineWidth = currentConfig.lineWidth;
    ctx.strokeStyle = currentConfig.color;
  };
  this.clear = function clear() {
    ctx.clearRect(0, 0, this.el.width, this.el.height);
  };

  this.step = () => {
    this.clear();
    this.draw();
    requestAnimationFrame(this.step);
  };

  this.registerFigure = function registerFigure(name, figureClass) {
    if (!figures[name]) {
      figures[name] = figureClass;
    }
  };

  this.el.addEventListener('touchstart', (e) => {
    const x = e.changedTouches[0].pageX;
    // we need a better method of finding this offset, it's too magical
    const y = e.changedTouches[0].pageY;
    newFigure(x, y);
  });

  this.el.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const x = e.changedTouches[0].pageX;
    const y = e.changedTouches[0].pageY;
    currentFigure.move(x, y, e);
  });

  this.el.addEventListener('mousedown', (e) => {
    clicked = true;
    const x = e.pageX;
    const y = e.pageY;
    newFigure(x, y);
  });

  this.el.addEventListener('mousemove', (e) => {
    if (clicked) {
      const x = e.pageX;
      const y = e.pageY;
      currentFigure.move(x, y, e);
    }
  });

  this.el.addEventListener('mouseup', () => {
    clicked = false;
    currentFigure.finalize();
  });

  this.undo = function undo() {
    undone.push(renderables.pop());
  };

  this.prop = function setProp(prop, val) {
    if (!val) {
      return currentConfig[prop];
    }
    currentConfig[prop] = val;
    return currentConfig[prop];
  };

  this.setFigure = function setFigure(fig) {
    if (figures[fig]) {
      selectedFigure = fig;
    }
    return selectedFigure;
  };
  this.step();
};

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
