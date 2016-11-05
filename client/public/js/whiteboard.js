let ctx, color = '#000';

document.addEventListener('DOMContentLoaded', () => {
  newCanvas()
}, false );

const newCanvas = function(){
  let canvas = '<canvas id="canvas" width="635" height="720"></canvas>';
  let canvasClone = '<canvas id="canvasClone" width="635" height="720"></canvas>';
  // let canvas = `<canvas id="canvas" width="${window.innerWidth}" height="${window.innerHeight - 90}"></canvas>`;
	document.getElementById('content').innerHTML = canvas + canvasClone;

	ctx = document.getElementById('canvas').getContext('2d');
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;

  drawTouch();
	drawMouse();
}

const drawTouch = function() {
	let start = function(e) {
		ctx.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY - 34;
		ctx.moveTo(x, y);
	};
	let move = function(e) {
		e.preventDefault();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY - 34;
		ctx.lineTo(x, y);
		ctx.stroke();
	};
  document.getElementById('canvas').addEventListener('touchstart', start, false);
	document.getElementById('canvas').addEventListener('touchmove', move, false);
};

const drawMouse = function() {
	let clicked = false;
	let start = function(e) {
		clicked = true;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY - 34;
		ctx.moveTo(x, y);
	};
	let move = function(e) {
    if(e.shiftKey && clicked) {
      x = e.pageX;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (clicked){
			x = e.pageX;
			y = e.pageY - 34;
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	};
	let stop = function(e) {
		clicked = false;
	};
  document.getElementById('canvas').addEventListener('mousedown', start, false);
	document.getElementById('canvas').addEventListener('mousemove', move, false);
	document.addEventListener('mouseup', stop, false);
};
