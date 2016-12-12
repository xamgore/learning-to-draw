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
