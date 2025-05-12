//import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import {Box, OrbitControls, Environment, useGLTF,useAnimations} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

// function MyBox(props) {
//    const geom = new THREE.BoxGeometry(1,1,1);
//    return (
//     <mesh {...props} geometry={geom}>
//         <meshStandardMaterial color="green" />
//         <axesHelper scale={1}/>
//     </mesh>
//    )
// }
function MyElement3D() {
    const model = useGLTF("/models/model.glb");
    const animations = useAnimations(model.animations, model.scene);
    const {actionName}  =  useControls({
        actionName: {
            options: animations.names,
            value: animations.names[1],
        },
    });             
    useEffect(() => {
        const action =  animations.actions[actionName];
        action.reset().fadeIn(0.5).play();
        //action.play();
        return () => {
            action.fadeOut(0.5).stop();
        }    
    },[actionName]);
    

    // const refMesh = useRef();
    // const refMesh2 = useRef();

    // const mesh1 = useRef();
    // const mesh2 = useRef();
    // const mesh3 = useRef();
    // const {radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength } = useControls({
    //     radius: {value: 1, min: 0.1, max: 5, step: 0.01},
    //     widthSegments: {value:32, min: 3, max: 256, step: 1},
    //     heightSegments: {value: 32, min: 2, max:256, step: 1},
    //     phiStart: {value: 0, min: 0, max: 360, step: 0.1},
    //     phiLength: {value: 360, min: 0, max: 360, step: 0.1},
    //     thetaStart: {value: 0, min: 0, max: 180, step: 0.1},
    //     thetaLength: {value: 360, min: 0, max: 180, step: 0.1},
    // });
    // useFrame((state, delta) => {
    //     refMesh.current.rotation.z +=delta;
    // })
    // const {roughness, metalness} = useControls({
    //     roughness: {value: 0.5, min: 0, max: 1, step: 0.01},
    //     metalness: {value: 0.5, min: 0, max: 1, step: 0.01},
    // })
    // useEffect(() => {
    //     refMesh2.current.geometry = refMesh.current.geometry;
    // },[radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength])

    // useEffect(() => {
    //     mesh1.current.material = mesh2.current.material;
    // },[])
    const [h, setH] = useState(0);
    useEffect(() => {
        let minY = Infinity;
        let maxY = -Infinity;
        model.scene.traverse((item) => {
            if (item instanceof THREE.Mesh) {
                item.castShadow = true;
                item.receiveShadow = true; 

                const geomBbox = item.geometry.boundingBox;
                if (item.position.y < minY) minY = geomBbox.y;
                if (item.position.y > maxY) maxY = geomBbox.y;
            }           
        });
        const h = maxY - minY;
        setH(h);
        console.log(h); 
    },[model.scene]); 
    
    return (
        <>
            {/* <directionalLight position={[1, 1, 1]} /> */}
            <Environment blur={0.5} background={true} files={"/images/golden_gate_hills_4k.hdr"} />
            <axesHelper scale={10}/>
            <OrbitControls />
            <primitive object={model.scene} position-y={0}/>
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

            {/* <mesh ref={refMesh}>
                <sphereGeometry args={[radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart*Math.PI/180, thetaLength*Math.PI/180]}/>
                <meshStandardMaterial color="red" />
                <axesHelper scale={1}/>
            </mesh>

            <mesh ref={refMesh2}>
                <boxGeometry />
                <meshStandardMaterial color="yellow" emissive={"yellow"} wireframe={true}/>
                <axesHelper scale={1}/>
            </mesh> */}

            {/* <mesh ref={mesh1} position={[-1.7,0,0]}>
                <boxGeometry />
                <meshBasicMaterial  />
                <axesHelper scale={1}/>
            </mesh>

            <mesh ref={mesh2} position={[1.7,0,0]}>
                <torusGeometry args={[0.5,0.2,16,60]} />
                <meshStandardMaterial 
                visible={true}
                transparent={false}
                opacity={1}
                depthTest={true}
                depthWrite={true}
                side={THREE.FrontSide}
                color={0xff0000}
                wireframe={false}
                emissive={0x000000}
                specular={0xffff00}
                shininess={100}
                flatShading={true}
                metalness={metalness}
                roughness={roughness}
                metalnessMap={new THREE.TextureLoader().load("textures/metalness.jpg")}
                //emissiveIntensity={1}
                />
                <axesHelper scale={1}/>
            </mesh>
            
            <mesh ref={mesh3} position={[0,0,0]}>  
                <cylinderGeometry args={[0.5,0.5,1,32]}/>
                <meshStandardMaterial color="red" />
                <axesHelper scale={1}/>
            </mesh> */}
            {/* <MyBox scale={[2,2,2]} position-y={2}/> */}

        </>
    )
}

export default MyElement3D;
/**
 * 로테이션은 시계 반대방향이 + 방향이다.
 */