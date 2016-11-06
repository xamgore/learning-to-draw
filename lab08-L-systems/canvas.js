let $       = (s) => document.querySelector(s),
    $$      = (s) => document.querySelectorAll(s),
    $canvas = $('canvas'),
    ctx     = $canvas.getContext("2d"),
    width   = 800,
    height  = 600,
    drawing = false;

ctx.canvas.width = width;
ctx.canvas.height = height;

NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

Object.prototype.dump = function () {
    return JSON.stringify(this)
}

function clean() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fill();
}
