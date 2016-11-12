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

  const events = {
    figureStart: [],
    figureEnd: [],
    step: [],
  };

  let currentFigure = null;
  let selectedFigure = 'line';

  const newFigure = function newFigure(x, y) {
    // empty the stack of undos
    undone = [];
    // create a new figure based on the one that is selected
    // last object is a configuration object
    currentFigure = new figures[selectedFigure](x, y, currentConfig);
    renderables.push(currentFigure);
    this.trigger('figureStart', currentFigure);
  }.bind(this);

  this.addFigure = function addFigure(figure) {
    renderables.push(new figures[figure.type](figure));
  };

  const endFigure = function endFigure() {
    if (currentFigure) {
      currentFigure.finalize();
      this.trigger('figureEnd', currentFigure);
      currentFigure = null;
    }
  }.bind(this);

  this.on = function on(eventName, func) {
    if (typeof func !== 'function') {
      return false;
    }
    if (!events[eventName]) {
      events[eventName] = [];
    }
    return events[eventName].push(func);
  };

  this.trigger = function trigger(eventName, ...args) {
    if (events[eventName]) {
      events[eventName].forEach(func => func(...args));
    }
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
    this.trigger('step');
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

  const ctxMenu = document.getElementById('context-menu');
  const circle = document.getElementById('circle');
  const items = document.querySelectorAll('.circle a');
  let ctxOpen = false;

  const contextMenu = function contextMenu(x, y) {
    ctxMenu.style.left = `${x - 65}px`;
    ctxMenu.style.top = `${y - 32}px`;
    for (let i = 0, l = items.length; i < l; i += 1) {
      items[i].style.left = `${(50 - (35 * Math.cos((-0.5 * Math.PI) - (2 * (1 / l) * i * Math.PI)))).toFixed(4)}%`;
      items[i].style.top = `${(50 + (35 * Math.sin((-0.5 * Math.PI) - (2 * (1 / l) * i * Math.PI)))).toFixed(4)}%`;
    }
    ctxOpen = true;
    circle.classList.add('open');
  };

  circle.addEventListener('click', () => {
    circle.classList.remove('open');
    ctxOpen = false;
    setTimeout(() => {
      ctxMenu.style.display = 'none';
    }, 200);
  });

  this.el.addEventListener('touchstart', (e) => {
    const { x, y } = getCoordinates(e);
    newFigure(x, y);
  });

  document.body.addEventListener('touchmove', (e) => {
    if (e.target === this.el && e.touches.length === 1) {
      e.preventDefault();
      const { x, y } = getCoordinates(e);
      currentFigure.move(x, y, e);
    }
  });

  this.el.addEventListener('touchend', () => {
    endFigure();
  });

  this.el.addEventListener('mousedown', (e) => {
    if (e.buttons === 1) {
      if (!ctxOpen) {
        const { x, y } = getCoordinates(e);
        newFigure(x, y);
      } else {
        ctxOpen = false;
        circle.classList.remove('open');
        setTimeout(() => {
          ctxMenu.style.display = 'none';
        }, 200);
      }
    }
  });

  this.el.addEventListener('mousemove', (e) => {
    if (e.buttons === 1) {
      const { x, y } = getCoordinates(e);
      if (!currentFigure) {
        newFigure(x, y);
      }
      currentFigure.move(x, y, e);
    }
  });

  this.el.addEventListener('mouseup', () => {
    endFigure();
  });

  this.el.addEventListener('mouseleave', () => {
    endFigure();
  });

  this.el.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    ctxMenu.style.display = null;
    const { x, y } = getCoordinates(e);
    contextMenu(x, y);
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
