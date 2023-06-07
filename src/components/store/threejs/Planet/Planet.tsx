import React, {FC, useEffect, useRef} from 'react';
import {useFrame} from "@react-three/fiber";
import Slice from "./UI/Slice";
import * as THREE from "three"
import {useAppSelector} from "../../../../hooks/redux";
import {IPlanet} from "../../../../types/entities/planetType";
import {ISliceState} from "../../../../types/store/scene/sceneTypes";
import {SlicePlanetSceneType} from "../../../../reducers/slices/scene/planetSceneSlice";

interface IPlanetComponent {
    children?: React.ReactNode
    planetRef?: React.Ref<THREE.Mesh>
    planet: IPlanet
    slice: SlicePlanetSceneType
}

const Planet: FC<IPlanetComponent> = ({slice, planet, children}) => {
    const actions = useAppSelector(state => state.planetSceneReducer[slice].actions.planet)
    const props = useAppSelector(state => state.planetSceneReducer[slice].scene.planet)

    const meshRef = useRef<THREE.Group>(null)
    useFrame(() => {
        if (meshRef.current && actions.rotationSpeed) {
            meshRef.current.rotation.y += 0.00008 * actions.rotationSpeed
        }
    })

    const slices = useAppSelector(state => state.planetSceneReducer[slice].scene.planet.slices!)

    return (
        <group scale={2} ref={meshRef}>
            {props.slices.atmosphere && actions.isCloud && planet?.textures?.atmosphere &&
                <Slice  sliceType={"atmosphere"} planet={planet} slice={slices.atmosphere} planetProps={props} actions={actions}/>
            }
            {props.slices.grid && actions.isGrid &&
                <Slice sliceType={"grid"} planet={planet} slice={slices.grid} planetProps={props} actions={actions}/>}
            <Slice sliceType={"surface"} planet={planet} slice={slices.surface} planetProps={props} actions={actions}/>
            {children}
        </group>
    );
};

export default Planet;