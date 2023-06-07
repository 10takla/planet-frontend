import React, {FC} from 'react';
import * as THREE from "three";
import {useTexture} from "@react-three/drei";
import {useAppSelector} from "../../../../hooks/redux";
import {ISliceState} from "../../../../types/store/scene/sceneTypes";
import {SlicePlanetSceneType} from "../../../../reducers/slices/scene/planetSceneSlice";

interface IEnvironment{
    slice: SlicePlanetSceneType
}

const Environment:FC<IEnvironment> = ({slice}) => {
    const props = useAppSelector(state => state.planetSceneReducer[slice].scene.environment)
    const texture = useTexture(props?.source ?? "assets/textures/defaultTexture.png")

    return (
        <mesh>
            <sphereGeometry args={[10000, 32, 16]}/>
            <meshBasicMaterial side={THREE.BackSide} map={texture}/>
        </mesh>
    );
};

export default Environment;