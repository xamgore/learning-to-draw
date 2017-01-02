var figure, count;

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
        console.log('applied');
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

    var img = ctx.createImageData(ctx.canvas.width, ctx.canvas.height),
        cw = ctx.canvas.width, ch = ctx.canvas.height,
        data = img.data,
        col = 0;

    count = 0;
    const drawLine = (x0, y0, x1, y1) => {
        if (count > 20) return;
        count++;

        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = (x0 < x1) ? 1 : -1;
        const sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;

        while (true) {
            const pidx = ((cx-x0|0) * cw + (cy-y0|0)) * 4;
            // console.log((cx-x0)|0, (cy-y0)|0, pidx);

            data[pidx] = col;
            data[pidx+3] = 255;

            if ((x0 == x1) && (y0 == y1)) break;
            const e2 = 2 * err;
            if (e2 > -dy) { err -= dy; x0  += sx; }
            if (e2 <  dx) { err += dx; y0  += sy; }
        }
    }

    const render = () => {
        // figure.apply(M.scale(0.5, 0.5, 0.5));
        let faces = figure.faces.filter(shouldDraw);
        let dr = 255.0 / faces.length;
        let fl = faces.length;
        data.fill(0);

        console.log(`len: ${fl}`);

        for (let fi = 0; fi < fl; fi++) {
            let [a, b, c, d] = faces[fi];
            col = fi * dr|0;

            drawLine(a.x, a.z, b.x, b.z);
            // drawLine(b.x, b.z, c.x, c.z);
            // drawLine(c.x, c.z, d.x, d.z);
            // drawLine(d.x, d.z, a.x, a.z);
        }

        console.log(count);
        ctx.putImageData(img, 0, 0);
        setTimeout(() => requestAnimationFrame(render), 1000);
    };

    figure.apply(M.scale(0.5, 0.5, 0.5));
    // figure.apply(rotate(figure.center, 10 * Math.PI / 360, 10 * Math.PI / 180));
    render();

    return f => figure = f;
}
