//vertex shader code
const vertexShaderText = `
precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;

void main()
{
  fragColor = vertColor;
  gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`
//fregment shader code
const fragmentShaderText = `
precision mediump float;

varying vec3 fragColor;
void main()
{
  gl_FragColor = vec4(fragColor, 1.0);
}
`

//export our strings containing the codes from our shaders
export { vertexShaderText, fragmentShaderText } 