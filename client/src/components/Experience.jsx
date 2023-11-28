import { ContactShadows, OrbitControls,Environment, useCursor } from "@react-three/drei";
import { useAtom } from "jotai";
import { Astronaut } from "./Astronaut";
import { charactersAtom } from "../components/SocketManager";
import { useState } from "react";
import { socket } from "../components/SocketManager";
import * as THREE from 'three'



export const Experience = () => {

  const [characters] = useAtom(charactersAtom)
  const [onFloor, setOnFloor] = useState(false)
  useCursor(onFloor)
  return (
    <>
   
      <Environment preset="sunset" />
      <ambientLight intensity={0.5}/>
      <ContactShadows resolution={1024} scale={10} opacity={1} />
      <OrbitControls />
      {
        characters.map((character, index) => {
          return <Astronaut 
          key={index} 
          topColor={character.topColor} 
          bottomColor={character.bottomColor} 
          bodyColor={character.bodyColor} 
          baseColor={character.baseColor}
          position={new THREE.Vector3(...character.position)} //character.position}

          />
        })
      }
      <mesh rotation-x={-Math.PI / 2} position-y={-0.001} onClick={(e) => socket.emit('move',[e.point.x,0,e.point.z])} onPointerEnter={()=>setOnFloor(true)} onPointerLeave={()=>setOnFloor(false)}>
        <boxGeometry args={[10,10, 0]}/>
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {/* <Astronaut  topColor="#F0F" bottomColor="#0F0" bodyColor="#000"/> */}
     
    </>
  );
};
