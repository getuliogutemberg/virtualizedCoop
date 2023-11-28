import { OrbitControls,Environment } from "@react-three/drei";
import { Astronaut } from "./Astronaut";

export const Experience = () => {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5}/>
      <OrbitControls />
      <Astronaut  topColor="#F0F" bottomColor="#0F0" bodyColor="#000"/>
     
    </>
  );
};
