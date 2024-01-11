import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';

export default function XRPage() {
  return (
    <div>
      <ARButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>
        </XR>
      </Canvas>
    </div>
  );
}
