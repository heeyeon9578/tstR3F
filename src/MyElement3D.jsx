import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import {Box, OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

function MyBox(props) {
   const geom = new THREE.BoxGeometry(1,1,1);
   return (
    <mesh {...props} geometry={geom}>
        <meshStandardMaterial color="green" />
        <axesHelper scale={1}/>
    </mesh>
   )
}
function MyElement3D() {
    const refMesh = useRef();
    const refMesh2 = useRef();
    const {xSize, ySize, zSize, xSegment, ySegment, zSegment} = useControls({
        xSize: {value: 1, min: 0.1, max: 5, step: 0.01},
        ySize: {value: 1, min: 0.1, max: 5, step: 0.01},
        zSize: {value: 1, min: 0.1, max: 5, step: 0.01},
        xSegment: {value: 1, min: 1, max: 10, step: 1}, //항상 정수값값
        ySegment: {value: 1, min: 1, max: 10, step: 1},
        zSegment: {value: 1, min: 1, max: 10, step: 1},
    });
    // useFrame((state, delta) => {
    //     refMesh.current.rotation.z +=delta;
    // })

    useEffect(() => {
        refMesh2.current.geometry = refMesh.current.geometry;
    },[])
    return (
        <>
            <directionalLight position={[1, 1, 1]} />
            <axesHelper scale={10}/>
            <OrbitControls />
            {/* <mesh ref={refMesh} position-y={2} scale={[2,2,2]} >
                <sphereGeometry /> 
                <meshStandardMaterial color="red" opacity={0.5} transparent/>
                <axesHelper scale={1}/>

                <mesh scale-x={0.1} scale-y={0.1} scale-z={0.1} position-x={2} position-y={2} position-z={2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="blue" />
                    <axesHelper scale={5}/>
                </mesh>
            </mesh> */}

            <mesh ref={refMesh}>
                <boxGeometry args={[xSize, ySize,zSize, xSegment, ySegment,zSegment]} />
                <meshStandardMaterial color="red" />
                <axesHelper scale={1}/>
            </mesh>

            <mesh ref={refMesh2}>
                <boxGeometry />
                <meshStandardMaterial color="yellow" emissive={"yellow"} wireframe={true}/>
                <axesHelper scale={1}/>
            </mesh>

            {/* <MyBox scale={[2,2,2]} position-y={2}/> */}

        </>
    )
}

export default MyElement3D;
/**
 * 로테이션은 시계 반대방향이 + 
 */