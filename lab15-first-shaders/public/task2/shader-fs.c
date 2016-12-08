precision mediump float;

varying vec4 vColor;

void main(void) {
    gl_FragColor = vec4( abs(sin(gl_FragCoord.y)), vColor.g, abs(sin(gl_FragCoord.x)), 1.0); // vec4(1.0, 0.5, 1.0, 1.0)
}
