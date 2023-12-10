import { shaderMaterial } from '@react-three/drei';
import { Color } from 'three';

export const FlagMaterial = shaderMaterial(
  {
    u_time: 0,
    u_offColor: new Color(0x999999),
    u_color: new Color(0.2, 0.0, 0.1)
  },
  // vertex shader
  /*glsl*/ `
  void main() {
    // projectionMatrix, modelViewMatrix, position -> Passed in from Three.js
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z, 1.0);
  }
  fragment
  `,
  // fragment shader
  /*glsl*/ `
  uniform float u_time;
uniform vec3 u_offColor;
uniform vec3 u_color;

void main() {
  float result;
  result = abs(sin(u_time));

  gl_FragColor = vec4(mix(u_offColor, u_color, result), 1.0);
}
`
);
