const Line = function Line(...args) {
  let startX = 0;
  let startY = 0;
  let config = {};
  let points = [];
  let options = {};
  if (args.length === 1) {
    this.finalized = args[0].finalized;
    ({ startX, startY, points, config } = args[0]);
  } else {
    options = args[2];
    startX = args[0];
    startY = args[1];
    this.finalized = false;
    const defaults = {
      lineWidth: 5,
      color: '#000',
      lineCap: 'round',
    };
    config = Object.assign({}, options, defaults);
    points.push({ x: startX, y: startY });
  }
  this.type = 'line';

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
    return Object.assign({
      type: this.type, startX, startY, finalized: this.finalized, points,
    }, { config });
  };
};

module.exports = Line;
