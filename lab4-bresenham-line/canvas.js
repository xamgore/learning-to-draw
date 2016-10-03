
let $       = (s) => document.querySelector(s),
    $$      = (s) => document.querySelectorAll(s),
    $canvas = $('canvas'),
    ctx     = $canvas.getContext("2d"),
    width   = 800,
    height  = 500,
    scale   = 1;

ctx.canvas.width = width;
ctx.canvas.height = height;
width = Math.round(width / scale);
height = Math.round(height / scale);

ctx.scale(scale, scale);
ctx.imageSmoothingEnabled = false;

var drawing = false, mouseButton, init = true;

ctx.lineWidth = 0.05;
ctx.fillStyle = '#777';


function offset(e) {
    return [Math.floor(e.offsetX / scale), Math.floor(e.offsetY / scale)];
}


var lastPos = [0, 0];

$canvas.onmousedown = (e) => {
    saveDrawingSurface();
    // beginPath();

    if (e.which == 1) {
        drawing = true;
        lastPos = offset(e);
    }
}

window.onmouseup = (_) => {
    drawing = false;
    // ctx.closePath();
}

$canvas.onmousemove = function(evt) {
    let e   = evt || event,
        [x, y] = offset(e),
        col = ctx.strokeStyle;

    if (drawing && e.which == 1) {
        restoreDrawingSurface();
        drawLine(lastPos, [x, y]);
    }

    document.title = (`${x} × ${y}`);
    ctx.strokeStyle = col;
}



NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

$('.actions').children.forEach(x => x.style.backgroundColor = x.dataset.color);
let changeStrokeStyle = (e) => ctx.fillStyle = e.target.dataset.color;
$$('.actions div').forEach(x => x.onclick = changeStrokeStyle);


function drawGrid() {
    ctx.lineWidth = 0.05;
    let last = ctx.fillStyle;
    ctx.strokeStyle = '#eee';
    for (let i = 0; i < width; i++) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.strokeStyle = 'black';

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, 1);
    ctx.fillRect(0, height - 1, width, 1);
    ctx.fillRect(width - 1, 0, 1, height);
    ctx.fillRect(0, 0, 1, height);
    ctx.fill();

    ctx.fillStyle = last;
}

$('#clean').onclick = () => {
    ctx.lineWidth = 0.05;
    ctx.clearRect(0, 0, width, height);
    drawGrid();
}

drawGrid();

function save() { localStorage.setItem("canva", $canvas.toDataURL()) }

function restore() {
    var dataURL = localStorage.getItem("canva");
    var img = new Image;
    img.src = dataURL;
    img.onload = () => ctx.drawImage(img, 0, 0, width, height)
}

function saveDrawingSurface() {
drawingSurfaceImageData =
    ctx.getImageData(0, 0, $canvas.width, $canvas.height);
}

function restoreDrawingSurface() {
   ctx.putImageData(drawingSurfaceImageData, 0, 0);
}
