import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";

function App() {
  return (
    <>
     <SocketManager />
    <Canvas shadows camera={{ position: [0, 5, 5], fov: 30}}>
      <color attach="background" args={["#000"]} />
      <Experience />
    </Canvas>
    </>
  );
}

export default App;
