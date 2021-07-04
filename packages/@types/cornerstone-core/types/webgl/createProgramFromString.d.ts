/**
 * Creates a program from 2 shaders source (Strings)
 * @param  {!WebGLRenderingContext} gl              The WebGL context.
 * @param  {!WebGLShader} vertexShaderSrc   Vertex shader string
 * @param  {!WebGLShader} fragShaderSrc Fragment shader string
 * @return {!WebGLProgram}                 A program
 * @memberof WebGLRendering
 */
export default function _default(gl: WebGLRenderingContext, vertexShaderSrc: WebGLShader, fragShaderSrc: WebGLShader): WebGLProgram;
