import React from "react";
import { Canvas } from "@react-three/fiber"; 
import { OrbitControls } from "@react-three/drei"; 
import Auth from "../Pages/Login"; 
import "../App.css"


const House = () => {
  return (  
    <group>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 2, 4 ]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      <mesh position={[0, 2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3, 1.5, 4]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <mesh position={[0, 0, 2.01]}>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color="darkbrown" />
      </mesh>
    </group>
  );
};


const BottomLight = () => {
  return (
    <pointLight
      position={[0, -2, 0]} 
      intensity={1.5}
      distance={10}
      color={"white"}
      castShadow
    />
  );
};


const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="left-side">
          <Canvas shadows>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <OrbitControls enableZoom={true} />
            <House />
            <BottomLight /> 
          </Canvas>
        </div>
        <div className="right-side">
          <Auth /> 
        </div>
      </div>
    </div>
  );
};

export default App;