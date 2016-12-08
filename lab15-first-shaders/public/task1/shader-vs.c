attribute vec3 aVertPos;

uniform mat4 uRot;
uniform mat4 uMove;
uniform mat4 uScale;
uniform mat4 uProject;

void main(void) {
    gl_Position = uProject * uMove * uRot * uScale * vec4(aVertPos, 1.0);
}
