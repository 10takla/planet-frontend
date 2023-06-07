import React, {FC, useEffect, useRef} from 'react';
import * as THREE from "three";
import {OrbitControls} from "@react-three/drei";
import {useAppSelector} from "../../../../hooks/redux";
import {MouseButtonEnum} from "../../../../types/store/scene/properties/plotPropertieseTypes";
import {SlicePlanetSceneType} from "../../../../reducers/slices/scene/planetSceneSlice";

interface IOrbitControlComponent {
    mouseKey?: number | null;
    slice: SlicePlanetSceneType
}

const OrbitControl: FC<IOrbitControlComponent> = ({mouseKey, slice}) => {
    const orbitControlsRef = useRef<any | null>(null);
    const actions = useAppSelector(state => state.planetSceneReducer[slice].actions.orbitControl)
    const props = useAppSelector(state => state.planetSceneReducer[slice].scene.orbitControl)
    const {isActiveCameraAnimation} = useAppSelector(state => state.planetSceneReducer[slice].events)

    useEffect(() => {
        isActiveCameraAnimation ? orbitControlsRef.current.autoRotate = false
            : orbitControlsRef.current.autoRotate = true
    }, [isActiveCameraAnimation]);

    return (
        <OrbitControls
            onChange={e => {
                // console.log('2')
                // dispatch(storeStateSlice.actions.setEvent({"orbitRotation": true}))
            }}
            onEnd={e => {
                // dispatch(storeStateSlice.actions.setEvent({"orbitRotation": false}))
            }}
            autoRotate={!!actions?.cameraRotation}
            autoRotateSpeed={actions ? actions.cameraRotation / 50 : 0}
            enablePan={false}
            minDistance={2.3}
            rotateSpeed={props?.rotateSpeed ?
                mouseKey === 0 ? props.rotateSpeed[MouseButtonEnum.LEFT] : props.rotateSpeed[MouseButtonEnum.RIGHT]
                : 1}
            zoomSpeed={1}
            enableDamping={true}
            dampingFactor={0.45}
            {...props?.control}
            mouseButtons={{
                LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.ROTATE, RIGHT: THREE.MOUSE.ROTATE
            }} ref={orbitControlsRef}/>
    );
};

export default OrbitControl;