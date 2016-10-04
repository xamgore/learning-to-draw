let $       = (s) => document.querySelector(s),
    $$      = (s) => document.querySelectorAll(s),
    $canvas = $('canvas'),
    ctx     = $canvas.getContext("2d"),
    width   = 800,
    height  = 500,
    drawing = false;

ctx.canvas.width = width;
ctx.canvas.height = height;


$canvas.onmousedown = (e) => { drawing = true; }

window.onmouseup = (_) => { drawing = false; }

$canvas.onmousemove = function(evt) { let e = evt || event; }


Array.prototype.equals = function(array) {
    return this.length == array.length
        && this.every( (el, i) => Math.abs(el - array[i]) < 5 )
}

 ImageData.prototype.getPixel = function (x, y) {
     let d = this.data, s = (y * this.width + x) * 4;
     return [ d[s], d[s + 1], d[s + 2] ];
 }

 ImageData.prototype.setPixel = function (x, y, vals) {
     let d = this.data, s = (y * this.width + x) * 4;
     d[s] = vals[0]; d[s + 1] = vals[1]; d[s + 2] = vals[2];
 }


// function fill(ox, oy) {
//     if (ox < 0 || ox > width || oy < 0 || oy > height) return;
//
//     let c = ctx.getImageData(0, 0, width, height);
//
//     let q = [[ox, oy]];
//
//     while (q.length) {
//         [x, y] = q.pop();
//
//         if (x < 0 || x > width || y < 0 || y > height) continue;
//
//         let col = c.getPixel(x, y);
//         const fillCol = fillImg.getPixel(x % img.width, y % img.height);
//         if (col.equals(fillCol)) continue;
//
//         let left = x, right = x;
//         for (var i = x - 1; c.getPixel(i, y).equals(col) && i >= 0; i--)
//             left = i;
//         for (let i = x + 1; c.getPixel(i, y).equals(col) && i <= width; i++)
//             right = i;
//
//         let upLine = false, botLine = false;
//
//         for (i = left; i < right; i++) {
//             const fillCol = fillImg.getPixel(i % img.width, y % img.height);
//             c.setPixel(i, y, fillCol);
//
//             // up line
//             if (!c.getPixel(i, y - 1).equals(col)) {
//                 upLine = false;
//             } else if (!upLine) {
//                 upLine = true;
//                 q.push([i, y - 1]);
//             }
//
//             // bottom
//             if (!c.getPixel(i, y + 1).equals(col)) {
//                 botLine = false;
//             } else if (!botLine) {
//                 botLine = true;
//                 q.push([i, y + 1]);
//             }
//         }
//
//     }
//
//     ctx.putImageData(c, 0, 0);
// }


NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

$('.actions').children.forEach(x => x.style.backgroundColor = x.dataset.color);
let changeStrokeStyle = (e) => ctx.strokeStyle = e.target.dataset.color;
$$('.actions div').forEach(x => x.onclick = changeStrokeStyle);

function getImg(img) {
    var canvas = document.createElement('canvas');

    canvas.width = img.width;
    canvas.height = img.height;
    
           canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    return canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
}
