var figure;

function loadMain() {
    let $canvas = document.querySelector(`#main`),
        ctx     = $canvas.getContext(`2d`);
        figure  = new Cube(new Vertex(0, 0, 0), 200);

    ctx.canvas.width  = $canvas.offsetWidth;
    ctx.canvas.height = $canvas.offsetHeight;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0)';

    let cx = ctx.canvas.width / 2,
        cy = ctx.canvas.height / 2;

    const rotate = (center, theta, phi) => {
        let [x, y, z] = [center.x, center.y, center.z];

        return M.pipe(...[
            M.move(x, y, z),   M.rotateOx(phi),
            M.rotateOz(theta), M.move(-x, -y, -z),
        ])
    };


    let moving = false, rotating = true;

    const move = evt => {
    	if (!moving) return;

    	let theta = evt.movementX * Math.PI / 360,
    	      phi = evt.movementY * Math.PI / 180;

        figure.apply(evt.ctrlKey
                    ? M.move(evt.movementX, 0, -evt.movementY)
                    : rotate(figure.center, theta, phi));
    }

    const startAutorotate = _.debounce(() => rotating = true, 300);

    $canvas.addEventListener('mousedown', () => { rotating = false; moving = true });
    $canvas.addEventListener('mouseup',   () => { startAutorotate(); moving = false });
    document.addEventListener('mousemove', move);

    document.onwheel = e => {
        let s = e.deltaY > 0 ? 9/10 : 10/9;
        figure.apply(M.scale(s, s, s));
    }

    const autorotate = f => rotate(f.center, -Math.PI / 720, Math.PI / 720);
    setInterval(() => rotating && figure.apply(autorotate(figure)), 30);

    var img = ctx.createImageData(ctx.canvas.width, ctx.canvas.height),
        data = img.data;

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

        const shouldDraw = ([x, y, z, w]) => (cos(x, y, z) || cos(x, z, w)) >= 0;

        let faces = figure.faces.filter(shouldDraw);
        let dr = 255.0 / faces.length;

        const drawFace = (face, i) => {
            ctx.fillStyle = `rgba(${i*dr|0}, 0, 0, 1)`;
            ctx.beginPath();
            _.each(_.map(face, project), lineTo);
    		ctx.closePath();
    		ctx.fill();
        };

        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // let img = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),

        const position = ({x:px, y:py}, {x:ax, y:az, z:ay}, {x:bx, y:bz, z:by}) => {
            return (bx-ax)*(py-ay)-(by-ay)*(px-ax);
        }

        const inTriangle = (p, a, b, c) => {
            return (position(p, a, b) < 0) && (position(p, b, c) < 0) && (position(p, c, a) < 0);
        }

        const belongs = (p, [a, b, c, d]) => {
            return inTriangle(p, a, b, c) || inTriangle(p, a, c, d);
        }

        let cw = ctx.canvas.width, ch = ctx.canvas.height, fl = faces.length;

        for (let i = 0; i < cw; i++) {
            for (let j = 0; j < ch; j++) {
                const p = {x: i - cx, y: j - cy};

                for (let fi = 0; fi < fl; fi++) {
                    const pidx = (i * cw + j)*4;

                    if (belongs(p, faces[fi])) {
                        data[pidx] = fi * dr|0;
                        data[pidx+3] = 255;
                    }
                }
            }
        }

        ctx.putImageData(img, 0, 0);

        // _.each(faces, drawFace);
        requestAnimationFrame(render);
    };

    render();


    return f => figure = f;
}
