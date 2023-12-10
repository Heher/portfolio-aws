import { shaderMaterial } from '@react-three/drei';
import { Color } from 'three';

export const MarkerMaterial = shaderMaterial(
  {
    u_color: new Color(0.2, 0.0, 0.1)
  },
  // vertex shader
  /*glsl*/ `
  void main() {
    // projectionMatrix, modelViewMatrix, position -> Passed in from Three.js
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z, 1.0);
  }
`,
  // fragment shader
  /*glsl*/ `
  uniform vec3 u_color;

void main() {
  gl_FragColor = vec4(u_color, 1.0);
}
`
);
