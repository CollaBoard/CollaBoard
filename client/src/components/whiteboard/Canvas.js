const Line = require('./Line');

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

  const getCoordinates = function getCoordinates(event) {
    const rect = element.getBoundingClientRect();
    let x;
    let y;
    if (event.touches) {
      x = event.changedTouches[0].clientX - rect.left;
      y = event.changedTouches[0].clientY - rect.top;
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }
    return {
      x, y,
    };
  };

  this.el.addEventListener('touchstart', (e) => {
    const { x, y } = getCoordinates(e);
    newFigure(x, y);
  });

  this.el.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    currentFigure.move(x, y, e);
  });

  this.el.addEventListener('mousedown', (e) => {
    clicked = true;
    const { x, y } = getCoordinates(e);
    newFigure(x, y);
  });

  this.el.addEventListener('mousemove', (e) => {
    if (clicked) {
      const { x, y } = getCoordinates(e);
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

module.exports = Canvas;
