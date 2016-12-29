function loadFig(onchange) {
    let $canvas = document.querySelector(`#fig`),
        ctx     = $canvas.getContext(`2d`),
        points  = [];

    ctx.canvas.width  = $canvas.offsetWidth;
    ctx.canvas.height = $canvas.offsetHeight;

    const redraw = () => {
        // console.log(JSON.stringify(points));
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.beginPath();
        ctx.moveTo(0, 0);

        points.forEach(pt =>
            ctx.lineTo(...pt) |
            ctx.arc(...pt, 1, 0, 6.283));

        ctx.lineTo(0, ctx.canvas.height);
        ctx.closePath();
        ctx.stroke();
    }

    const sendResult = () => {
        let res = [].concat([[0, 0]], points, [[0, ctx.canvas.height]]);
        onchange && onchange(res);
    }

    const addPoint = pt => points.push(pt) | redraw() | sendResult();

    $canvas.onclick = e => addPoint([e.offsetX, e.offsetY]);
}
