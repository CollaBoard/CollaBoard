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

module.exports = Line;
