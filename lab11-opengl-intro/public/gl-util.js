let $       = (s) => document.querySelector(s),
    $$      = (s) => document.querySelectorAll(s);


window.onload = () => {
    const $canvas  = $('canvas');
    $canvas.width  = $canvas.offsetWidth * 2;
    $canvas.height = $canvas.offsetHeight * 2;
    loadWebGL();
};

window.orientationchange = window.onresize = () => {
    const $canvas  = $('canvas');
    gl.width  = $canvas.width  = $canvas.offsetWidth * 2;
    gl.height = $canvas.height = $canvas.offsetHeight * 2;
    draw();
};


const loadWebGLContext = (canvas) =>
    Promise.try(() => Object.assign(
        canvas.getContext('webgl'), {
            width:  canvas.width,
            height: canvas.height,
        }))
    // .catchThrow('Can\'t load WebGL context');
    .catch(e => console.log(e));


const handle404Error = (response) => {
    if (!response.ok) throw Error(response.statusText);
    return response;
};


const loadShader = (gl, type, url) =>
    Promise.resolve(fetch(url))
        .then(handle404Error)
        .then(res => res.text())
        .catchThrow(`Can\'t load shader from ${url}`)
        .then(source => gl.utilCompileShader(type, source));



function createTriangleBuffer() {
    let buf = gl.createBuffer();
    buf.itemSize = 3;
    buf.size = 3;

    let vertices = [
         0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
         1.0, -1.0,  0.0,
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    return buf;
}

function createSquareBuffer() {
    let buf = gl.createBuffer();
    buf.itemSize = 3;
    buf.size = 4;

    vertices = [
         1.0,  1.0,  0.0,
        -1.0,  1.0,  0.0,
         1.0, -1.0,  0.0,
        -1.0, -1.0,  0.0,
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    return buf;
}
