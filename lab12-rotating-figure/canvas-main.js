var figure;

function loadMain() {
    let $canvas = document.querySelector(`#main`),
        ctx     = $canvas.getContext(`2d`);
        figure  = new Cube(new Vertex(0, 0, 0), 200);

    ctx.canvas.width  = $canvas.offsetWidth;
    ctx.canvas.height = $canvas.offsetHeight;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';

    let cx = ctx.canvas.width / 2,
        cy = ctx.canvas.height / 2;

    const rotate = (center, theta, phi) => {
        let [x, y, z] = [center.x, center.y, center.z];

        return M.pipe(...[
            M.move(x, y, z),   M.rotateOx(phi),
            M.rotateOz(theta), M.move(-x, -y, -z),
        ])
    };


    let mousedown = false;

    const move = evt => {
    	if (!mousedown) return;

    	let theta = evt.movementX * Math.PI / 360,
    	      phi = evt.movementY * Math.PI / 180;

        figure.apply(evt.ctrlKey
                    ? M.move(evt.movementX, 0, -evt.movementY)
                    : rotate(figure.center, theta, phi));
    }

    document.onmousemove = e => { mousedown = e.buttons > 0; move(e); }

    document.onwheel = e => {
        let s = e.deltaY > 0 ? 9/10 : 10/9;
        figure.apply(M.scale(s, s, s));
    }

    const autorotate = f => rotate(f.center, -Math.PI / 720, Math.PI / 720);
    setInterval(() => !mousedown | figure.apply(autorotate(figure)), 30);


    const render = () => {
        const lineTo = p => ctx.lineTo(p.x + cx, -p.y + cy);

        const project = V => new Vertex2D(V.x, V.z);

        const drawFace = face => {
            ctx.beginPath();
            _.each(_.map(face, project), lineTo);
    		ctx.closePath();
    		ctx.stroke();
    		ctx.fill();
        };

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = figure.color;

        _.each(figure.faces, drawFace);
        requestAnimationFrame(render);
    };

    render();


    return f => figure = f;
}



// let $       = (s) => document.querySelector(s),
//     $$      = (s) => document.querySelectorAll(s),
//     // $canvas = $('canvas'),
//     ctx     = $canvas.getContext("2d"),
//     drawing = false;

// ctx.canvas.width = width;
// ctx.canvas.height = height;

// Array.prototype.equals = function([x, y, _]) {
//     return this[0] == x && this[1] == y;
// }
//
// Array.prototype.remove = function(elem) {
//     let copy = this.slice(0, this.length);
//     copy.splice(this.indexOf(elem), 1);
//     return copy;
// };


Array.prototype.getVertices = function(d, center) {
    return _.map(this, ([x, y, z]) => new Vertex(center.x + x*d, center.y + y*d, center.z + z*d));
}

Array.prototype.getFaces = function(vertices) {
    return _.map(this, arr => _.map(arr, i => vertices[i]));
}
