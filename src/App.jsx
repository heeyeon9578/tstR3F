import './App.css'
import { Canvas } from '@react-three/fiber'
import MyElement3D from './MyElement3D'
function App() {
  

  return (
    <>
     <Canvas id="canvas">
      <MyElement3D />
     </Canvas>
    </>
  )
}

export default App
