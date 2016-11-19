attribute vec3 aVertPos;
attribute vec4 aVertCol;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uRtMatrix;

varying vec4 vColor;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * uRtMatrix * vec4(aVertPos, 1.0);
    vColor = aVertCol;
}
