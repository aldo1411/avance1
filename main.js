//import all of our functions we're using
import { vertexShaderText, fragmentShaderText } from './js/shaders.js'
import vertexArr from './js/vertices.js'
import { compileCode, setProgram, drawAllTriangles } from './js/controlers.js'

/** 
 * render all of our elements in our html document
*/
const  main = () => {
  const canvas = document.querySelector("#glCanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");
  // Only continue if WebGL is available and working
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Create Shaders
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  //Compile vertex code
  compileCode(gl, vertexShader, vertexShaderText, fragmentShader, fragmentShaderText)
  // Create program
  const program = gl.createProgram()
  setProgram(gl, program, vertexShader, fragmentShader)
  // Specify the location where we're drawing
  const positionAttribute = gl.getAttribLocation(program, 'vertPosition')
  const colorAttribute = gl.getAttribLocation(program, 'vertColor')

  drawAllTriangles(vertexArr, gl, positionAttribute, colorAttribute, program)
}

window.onload = main; 