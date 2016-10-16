let $       = (s) => document.querySelector(s),
    $$      = (s) => document.querySelectorAll(s),
    $canvas = $('canvas'),
    ctx     = $canvas.getContext("2d"),
    width   = 500,
    height  = 500,
    drawing = false;

ctx.canvas.width = width;
ctx.canvas.height = height;


CanvasRenderingContext2D.prototype.show = function (img) {
    this.putImageData(img, (width - img.width) / 2, (height - img.height) / 2);
}

Array.prototype.equals = function(array) {
    return this.length == array.length
        && this.every( (el, i) => Math.abs(el - array[i]) < 5 )
}

Array.prototype.removeIf = function(predicate) {
    var i = this.length;
    while (i--) {
        if (predicate(this[i], i))
            this.splice(i, 1);
    }
};

ImageData.prototype.getPixel = function (x, y) {
    let d = this.data, s = (y * this.width + x) * 4;
    return [ d[s], d[s + 1], d[s + 2], d[s + 3] ];
}

ImageData.prototype.setPixel = function (x, y, vals) {
    let d = this.data, s = (y * this.width + x) * 4;
    d[s] = vals[0]; d[s + 1] = vals[1]; d[s + 2] = vals[2]; d[s + 3] = 255;
}




NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;


function getImg(img) {
    var canvas = document.createElement('canvas');

    canvas.width = img.width;
    canvas.height = img.height;

           canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    return canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
}
