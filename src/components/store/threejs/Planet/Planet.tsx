import React, {FC, useEffect, useRef} from 'react';
import {IPlanet, IPlanetProperties} from "../../../../types/store/threejs/planetObjectsTypes";
import {useFrame} from "@react-three/fiber";
import Slice from "./UI/Slice";
import * as THREE from "three"
import {useAppSelector} from "../../../../hooks/redux";

interface IPlanetComponent extends IPlanetProperties {
    children?: React.ReactNode
    planetRef?: React.Ref<THREE.Mesh>
    planet: IPlanet
}

const Planet: FC<IPlanetComponent> = ({planetRef, planet, children, ...props}) => {
    const {isCloud, isGrid} = props.actions.buttons
    const {rotationSpeed} = props.actions.ranges
    const {isActiveCameraAnimation} = useAppSelector(state => state.storeStateReducer.events)

    const meshRef = useRef<THREE.Group>(null)
    useFrame(() => {
        if (meshRef.current && rotationSpeed) {
            meshRef.current.rotation.y += 0.00008 * rotationSpeed
        }
    })

    return (
        <group scale={2} ref={meshRef}>
            {props.slices.atmosphere && isCloud && planet?.textures?.atmosphere &&
                <Slice sliceType={"atmosphere"} planet={planet} {...props}/>
            }
            {props.slices.grid && isGrid &&
                <Slice sliceType={"grid"} planet={planet} {...props}/>}
            <Slice sliceType={"surface"} planet={planet} {...props}/>
            {children}
        </group>
    );
};

export default Planet;