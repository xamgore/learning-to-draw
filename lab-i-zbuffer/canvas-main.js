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


    let moving = false;

    const move = evt => {
    	if (!evt.buttons) return;

    	let theta = evt.movementX * Math.PI / 360,
    	      phi = evt.movementY * Math.PI / 180;

        figure.apply(evt.ctrlKey
                    ? M.move(evt.movementX, 0, -evt.movementY)
                    : rotate(figure.center, theta, phi));
    }

    document.onmousemove = move;

    document.onwheel = e => {
        let s = e.deltaY > 0 ? 9/10 : 10/9;
        figure.apply(M.scale(s, s, s));
    }


    const cos = (x, y, z) => {
        ax = x.x - y.x, ay = x.y - y.y, az = x.z - y.z,
        bx = z.x - y.x, by = z.y - y.y, bz = z.z - y.z,
        i = ay * bz - az * by,
        j = ax * bz - az * bx,
        k = ax * by - ay * bx;
        return (j / Math.sqrt(i*i + j*j + k*k));
    }

    const shouldDraw = ([x, y, z, w]) => (cos(x, y, z) || cos(x, z, w)) >= 0;

    const belongs = (px, py, [{x:ax, y:az, z:ay}, {x:bx, y:bz, z:by}, {x:cx, y:cz, z:cy}, {x:dx, y:dz, z:dy}]) => {
        return (
            (bx-ax)*(py-ay)-(by-ay)*(px-ax) < 0 &&
            (cx-bx)*(py-by)-(cy-by)*(px-bx) < 0 &&
            (ax-cx)*(py-cy)-(ay-cy)*(px-cx) < 0
        ) || (
            (cx-ax)*(py-ay)-(cy-ay)*(px-ax) < 0 &&
            (dx-cx)*(py-cy)-(dy-cy)*(px-cx) < 0 &&
            (ax-dx)*(py-dy)-(ay-dy)*(px-dx) < 0
        )
    }

    var img = ctx.createImageData(ctx.canvas.width, ctx.canvas.height),
        cw = ctx.canvas.width, ch = ctx.canvas.height,
        data = img.data;

    const render = () => {
        let faces = figure.faces.filter(shouldDraw);
        let dr = 255.0 / faces.length;
        let fl = faces.length;
        data.fill(0);

        for (let i = 0; i < cw; i++) {
            for (let j = 0; j < ch; j++) {

                for (let fi = 0; fi < fl; fi++) {
                    if (belongs(i - cx, j - cy, faces[fi])) {
                        const pidx = (i * cw + j) * 4;
                        data[pidx] = fi * dr|0;
                        data[pidx+3] = 255;
                    }
                }
            }
        }

        ctx.putImageData(img, 0, 0);
        requestAnimationFrame(render);
    };

    render();

    return f => figure = f;
}
