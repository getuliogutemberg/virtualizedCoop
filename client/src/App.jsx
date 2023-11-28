import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 5], fov: 30}}>
      <color attach="background" args={["#000"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
