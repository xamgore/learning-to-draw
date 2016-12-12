attribute vec3 aVertPos;

uniform mat4 uMove;
uniform mat4 uProject;

attribute vec4 aVertCol;
varying vec4 vColor;

void main(void) {
    gl_Position = uProject * uMove * vec4(aVertPos, 1.0);
    vColor = aVertCol;
}
