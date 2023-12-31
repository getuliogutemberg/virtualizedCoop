/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/Astronaut.glb -o src/components/Astronaut.jsx -r public 
*/

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useFrame, useGraph } from '@react-three/fiber'

const MOVIMENT_SPEED = 0.05
export function Astronaut({topColor = 'gray',bodyColor = 'gray', bottomColor = 'gray',baseColor = 'gray',...props}) {

  const position = useMemo(() =>props.position, [])

  const group = useRef()
  const { scene, materials, animations } = useGLTF('/models/Astronaut.glb')

  const clone = useMemo(() => SkeletonUtils.clone(scene),[scene])
  const { nodes } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  console.log(actions)
  const [ animation,setAnimation ] = useState('CharacterArmature|Idle_Neutral')

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play()
    return () => {
      actions[animation]?.stop().fadeOut(0.5)
    }
  }, [animation])

  useFrame(() => {
    if (group.current.position.distanceTo(props.position) > 0.1) {
      const direction = group.current.position.clone().sub(props.position).normalize().multiplyScalar(MOVIMENT_SPEED)
      group.current.position.sub(direction)
      group.current.lookAt(props.position)
      setAnimation('CharacterArmature|Walk')
    } else {
      setAnimation('CharacterArmature|Idle_Neutral')
    }
  })
  return (
    <group ref={group} {...props} position={position} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.Root} />
          </group>
          <group name="SpaceSuit_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="SpaceSuit_Feet_1" geometry={nodes.SpaceSuit_Feet_1.geometry} material={materials.SciFi_Light_Accent} skeleton={nodes.SpaceSuit_Feet_1.skeleton} ><meshStandardMaterial metalness={1} color={bottomColor} /></skinnedMesh>
            <skinnedMesh name="SpaceSuit_Feet_2" geometry={nodes.SpaceSuit_Feet_2.geometry} material={materials.SciFi_Light} skeleton={nodes.SpaceSuit_Feet_2.skeleton} ><meshStandardMaterial  color={baseColor} /></skinnedMesh>
          </group>
          <group name="SpaceSuit_Legs" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="SpaceSuit_Legs_1" geometry={nodes.SpaceSuit_Legs_1.geometry} material={materials.SciFi_Light_Accent} skeleton={nodes.SpaceSuit_Legs_1.skeleton} ><meshStandardMaterial color={baseColor} /></skinnedMesh>
            <skinnedMesh name="SpaceSuit_Legs_2" geometry={nodes.SpaceSuit_Legs_2.geometry} material={materials.SciFi_Light} skeleton={nodes.SpaceSuit_Legs_2.skeleton} ><meshStandardMaterial metalness={1} color={bodyColor} /></skinnedMesh>
            <skinnedMesh name="SpaceSuit_Legs_3" geometry={nodes.SpaceSuit_Legs_3.geometry} material={materials.SciFi_MainDark} skeleton={nodes.SpaceSuit_Legs_3.skeleton} ><meshStandardMaterial color={baseColor} /></skinnedMesh>
            <skinnedMesh name="SpaceSuit_Legs_4" geometry={nodes.SpaceSuit_Legs_4.geometry} material={materials.SciFi_Main} skeleton={nodes.SpaceSuit_Legs_4.skeleton} ><meshStandardMaterial metalness={1} color={bottomColor} /></skinnedMesh>
          </group>
          <group name="SpaceSuit_Body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="SpaceSuit_Body_1" geometry={nodes.SpaceSuit_Body_1.geometry} material={materials.SciFi_Light_Accent} skeleton={nodes.SpaceSuit_Body_1.skeleton} ><meshStandardMaterial metalness={1} color={bodyColor} /></skinnedMesh>
            <skinnedMesh name="SpaceSuit_Body_2" geometry={nodes.SpaceSuit_Body_2.geometry} material={materials.SciFi_Light} skeleton={nodes.SpaceSuit_Body_2.skeleton} ><meshStandardMaterial metalness={1} color={bodyColor} /></skinnedMesh>
            <skinnedMesh name="SpaceSuit_Body_3" geometry={nodes.SpaceSuit_Body_3.geometry} material={materials.SciFi_MainDark} skeleton={nodes.SpaceSuit_Body_3.skeleton} ><meshStandardMaterial color={baseColor} /></skinnedMesh>
            <skinnedMesh name="SpaceSuit_Body_4" geometry={nodes.SpaceSuit_Body_4.geometry} material={materials.SciFi_Main} skeleton={nodes.SpaceSuit_Body_4.skeleton} ><meshStandardMaterial color={baseColor} /></skinnedMesh>
          </group>
          <group name="SpaceSuit_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="SpaceSuit_Head_1" geometry={nodes.SpaceSuit_Head_1.geometry} material={materials.SciFi_Light_Accent} skeleton={nodes.SpaceSuit_Head_1.skeleton} ><meshStandardMaterial metalness={1} color={topColor} /></skinnedMesh>
            <skinnedMesh name="SpaceSuit_Head_2" geometry={nodes.SpaceSuit_Head_2.geometry} material={materials.SciFi_Light} skeleton={nodes.SpaceSuit_Head_2.skeleton} ><meshStandardMaterial metalness={1} color={topColor} /></skinnedMesh>
            <skinnedMesh name="SpaceSuit_Head_3" geometry={nodes.SpaceSuit_Head_3.geometry} material={materials.Grey} skeleton={nodes.SpaceSuit_Head_3.skeleton} ><meshStandardMaterial color={baseColor} /></skinnedMesh>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Astronaut.glb')
