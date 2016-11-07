let ctx, color = '#000';
let canvasState = true;
const moveCanvas = function() {
  if (canvasState) {
    canvasState = false;
  } else {
    canvasState = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createCanvas()
}, false );

const createCanvas = function(){
  const content = document.getElementById('content');
  const newCanvas = '<canvas id="canvas" width="1270" height="720"></canvas>';
  // let canvasClone = '<canvas id="canvasClone" width="635" height="720"></canvas>';
  // let canvas = `<canvas id="canvas" width="${window.innerWidth}" height="${window.innerHeight - 90}"></canvas>`;
  // document.getElementById('content').innerHTML = canvas + canvasClone;
  content.innerHTML = newCanvas;
  const canvas = document.getElementById('canvas');

  ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;

  drawTouch();
  drawMouse();
}

const drawTouch = function() {

  const startTouch = function(e) {
    ctx.beginPath();
    let x = e.changedTouches[0].pageX + content.scrollLeft;
    let y = e.changedTouches[0].pageY - 34 + content.scrollTop;
    ctx.moveTo(x, y);
  };
  const moveTouch = function(e) {
    if (canvasState) {
      e.preventDefault();
      let x = e.changedTouches[0].pageX + content.scrollLeft;
      let y = e.changedTouches[0].pageY - 34 + content.scrollTop;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  canvas.addEventListener('touchstart', startTouch, false);
  canvas.addEventListener('touchmove', moveTouch, false);
};

const drawMouse = function() {
  let clicked = false;
  const startMouse = function(e) {
    clicked = true;
    ctx.beginPath();
    let x = e.pageX + content.scrollLeft;
    let y = e.pageY - 34 + content.scrollTop;
    ctx.moveTo(x, y);
  };
  const moveMouse = function(e) {
    if(e.shiftKey && clicked) {
      let x = e.pageX + content.scrollLeft;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (clicked){
      let x = e.pageX + content.scrollLeft;
      let y = e.pageY - 34 + content.scrollTop;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };
  const stopMouse = function(e) {
    clicked = false;
  };
  canvas.addEventListener('mousedown', startMouse, false);
  canvas.addEventListener('mousemove', moveMouse, false);
  canvas.addEventListener('mouseleave', stopMouse, false);
  document.addEventListener('mouseup', stopMouse, false);
};
