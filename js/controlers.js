/**
 * Draws triangles individually.
 * @param {Array} [triangle] vertex array that we're drawing
 * @param {Object} [gl] gl object 
 * @param {Object} [positionAttribute] position attribute object to be specified on canvas
 * @param {Object} [colorAttribute] color attribute object to be specified on canvas
 * @param {Object} [program] program object where we are drawing
 */
const drawTtriangles = (triangle, gl, positionAttribute, colorAttribute, program) => {
  //Create buffer for our triangle
  const triangleVertexBufferObject = gl.createBuffer()
  //Bind buffer to our triangle vertex 
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject)
  //Specify data on the buffer @arg1 = type of buffer we're passing, @arg2 = the points that we're using, @arg3 = the information is going be sent just 1 time
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle) , gl.STATIC_DRAW) 

  //Specify layout
  gl.vertexAttribPointer(
    positionAttribute, //Attribute location
    2, //Number of elements per attribute
    gl.FLOAT, //Type of elements
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT, //Size of an individual vertex
    0 //Offset from the begining of a single vertex to this attribute
  )
  
  gl.vertexAttribPointer(
      colorAttribute, //Attribute color
    3, //Number of elements per attribute
    gl.FLOAT, //Type of elements
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT, //Size of an individual vertex
    2 * Float32Array.BYTES_PER_ELEMENT //Offset from the begining of a single vertex to this attribute
  )
  
  gl.enableVertexAttribArray(positionAttribute)
  gl.enableVertexAttribArray(colorAttribute)
  
  //Main render loop
  gl.useProgram(program)
  //@arg1 = what we're drwing (always triangels), @arg2 = vertices we're skipping, @arg3 = how many vertices are we drawing
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}


/**
 * Compiles shaders code and if its wrong any of them give error on console.
 * @param {*} [gl] gl object
 * @param {*} [vertexShader] vertex shader object to be compiled
 * @param {*} [vertexShaderText] vertex shader code
 * @param {*} [fragmentShader] fragment shader object to be compiled
 * @param {*} [fragmentShaderText] fragment shader code
 */
const compileCode = (gl, vertexShader, vertexShaderText, fragmentShader, fragmentShaderText) =>{
  gl.shaderSource(vertexShader, vertexShaderText)
  gl.shaderSource(fragmentShader, fragmentShaderText)

  gl.compileShader(vertexShader)
  if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
    console.error('Error compiling shader', gl.getShaderInfoLog(vertexShader))
    return;
  }

  gl.compileShader(fragmentShader)
  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
    console.error('Error compiling shader', gl.getShaderInfoLog(fragmentShader))
    return;
  }
}


/**
 * Sets program to be used 
 * @param {*} [gl] object
 * @param {*} [program] program to be setted up
 * @param {*} [vertexShader] vertex shader to be attached on program
 * @param {*} [fragmentShader] fragment shader to be attached on program
 * @returns 
 */
const setProgram = (gl, program, vertexShader, fragmentShader) =>{
  //Tell openGL that these are the 2 shaders we're using on the program
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error('Error linking program', gl.getProgramInfoLog(program))
    return;
  }
  gl.validateProgram(program)
  if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
    console.error('Error validating program', gl.getProgramInfoLog(program))
    return;
  }
}


/**
 * Draws all triangles from verticess.js using drawTriangles function given a array with al the vertices from different triangles.
 * @param {*} [triangles] array of arrays that contain al of the vertices from every triangle
 * @param {*} [gl]  gl object
 * @param {*} [positionAttribute] position attribute from our canvas
 * @param {*} [colorAttribute] color attribute from our canvas
 * @param {*} [program] program to be used
 */
const drawAllTriangles = (triangles, gl, positionAttribute, colorAttribute, program) =>{
  triangles.forEach(triangle => {
    drawTtriangles(triangle, gl,positionAttribute, colorAttribute, program)
  });
}

export { drawTtriangles, compileCode, setProgram, drawAllTriangles }