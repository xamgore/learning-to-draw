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

Array.prototype.equals = function([x, y, _]) {
    return this[0] == x && this[1] == y;
}

Array.prototype.remove = function(elem) {
    let copy = this.slice(0, this.length);
    copy.splice(this.indexOf(elem), 1);
    return copy;
};

Object.prototype.dump = function () {
    return JSON.stringify(this)
}


Array.prototype.getVertices = function(d, center) {
    return _.map(this, ([x, y, z]) => new Vertex(center.x + x*d, center.y + y*d, center.z + z*d));
}

Array.prototype.getFaces = function(vertices) {
    return _.map(this, arr => _.map(arr, i => vertices[i]));
}
