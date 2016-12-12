/**
 * Creates and compiles a shader.
 *
 * @param {number} type The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
 * @param {string} source The GLSL source code for the shader.
 * @return {!WebGLShader} The shader.
 */
WebGLRenderingContext.prototype.utilCompileShader = function(type, source) {
    let gl     = this,
        shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    } else {
        const e = 'compilation error!\n\n';
        throw new Error(e + gl.getShaderInfoLog(shader));
    }
};


/**
 * Creates a program from 2 shaders.
 *
 * @param {!WebGLShader} shaders Vertex & fragment shaders.
 * @return {!WebGLProgram} A program.
 */
WebGLRenderingContext.prototype.utilCreateProgram = function(shaders) {
    let gl      = this,
        program = gl.createProgram(shaders);

    shaders.forEach(sh => gl.attachShader(program, sh));

    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program;
    } else {
      const e = 'program failed to link!\n\n';
      throw new Error(e + gl.getProgramInfoLog(program));
    }
};
