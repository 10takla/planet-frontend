import React, {FC} from 'react';
import * as THREE from "three";
import {useTexture} from "@react-three/drei";
import {ISceneProperties} from "../../../../types/store/threejs/sceneTypes";


const Environment:FC<ISceneProperties["environment"]> = ({...props}) => {
    const texture = useTexture(props.source)

    return (
        <mesh>
            <sphereGeometry args={[10000, 32, 16]}/>
            <meshBasicMaterial side={THREE.BackSide} map={texture}/>
        </mesh>
    );
};

export default Environment;