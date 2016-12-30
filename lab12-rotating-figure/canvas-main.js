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


    let render = () => {
        const lineTo = p => ctx.lineTo(p.x + cx, -p.y + cy);

        const project = V => new Vertex2D(V.x, V.z);

        const cos = (x, y, z) => {
            a = _.mergeWith(_.clone(x), y, _.subtract),
            b = _.mergeWith(_.clone(z), y, _.subtract),
            i = (a.y * b.z - a.z * b.y),
            j = (a.x * b.z - a.z * b.x),
            k = (a.x * b.y - a.y * b.x);
            return (j / Math.sqrt(i*i + j*j + k*k));
        }

        const drawFace = face => {
            let [x, y, z, w] = face,
                c = cos(x, y, z) || cos(x, z, w);

            if (c >= 0) {
                ctx.beginPath();
                _.each(_.map(face, project), lineTo);
        		ctx.closePath();
        		ctx.stroke();
        		ctx.fill();
            }
        };

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = figure.color;

        _.each(figure.faces, drawFace);
        requestAnimationFrame(render);
    };

    render();


    return f => figure = f;
}
