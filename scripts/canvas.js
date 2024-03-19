//button selection
const drawBtn = document.querySelector('#draw');
const dotBtn = document.querySelector('#dot');
const undoBtn = document.querySelector('#undo');
//this app will use the Canvas 2D API https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d', {willReadFrequently: true});
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

//variable to control deleting and drawing functionality 
let isPainting = false;

// storing current drawings for undo functionality
const drawings = [];

//draw btn event
drawBtn.onclick = (e) => {
  e.preventDefault();
  
  canvas.onmousedown = e => {
    isPainting = true;
    context.lineWidth = 5;
    context.strokeStyle = '#030303';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    e.preventDefault();
  };
  
  canvas.onmousemove = e => {
    if (!isPainting) return;
    const canvasDOMrect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvasDOMrect.width;
    const scaleY = canvas.height / canvasDOMrect.height;
    let x = (e.clientX - canvasDOMrect.left) * scaleX;
    let y = (e.clientY - canvasDOMrect.top) * scaleY;
    context.lineTo(x, y);
    context.stroke();
    e.preventDefault();
  }
  
  canvas.onmouseup = e => {
    drawings.push(context.getImageData(0, 0, canvas.width, canvas.height));
    isPainting = false;
    e.preventDefault();
  };

  canvas.onmouseout = e => {
    isPainting = false;
    e.preventDefault();
  }
}

//dot button
dot.onclick = e => {
  canvas.onmousedown = e => {
    const canvasDOMrect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvasDOMrect.width;
    const scaleY = canvas.height / canvasDOMrect.height;
    const circle = new Path2D();
    let x = (e.clientX - canvasDOMrect.left) * scaleX;
    let y = (e.clientY - canvasDOMrect.top) * scaleY;
    circle.arc(x, y, 6, 0, 2 * Math.PI);
    context.fill(circle)
    e.preventDefault();
  };
  
  canvas.onmouseup = e => {
    drawings.push(context.getImageData(0, 0, canvas.width, canvas.height));
    e.preventDefault();
  };
}

// undo button event
undoBtn.onclick = (e) => {
  e.preventDefault();
  if (drawings.length <= 1) {
    drawings.pop();
    context.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  drawings.pop();
  context.putImageData(drawings[drawings.length - 1], 0, 0);
}
