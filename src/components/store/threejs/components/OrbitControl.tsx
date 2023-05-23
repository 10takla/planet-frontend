import React, {FC, useEffect, useRef} from 'react';
import * as THREE from "three";
import {OrbitControls} from "@react-three/drei";
import {IOrbitControl, MouseButtonEnum} from "../../../../types/store/threejs/sceneTypes";
import {useAppSelector} from "../../../../hooks/redux";

interface IOrbitControlComponent extends IOrbitControl {
    mouseKey?: number | null;
}

const OrbitControl: FC<IOrbitControlComponent> = ({mouseKey, ...props}) => {
    const orbitControlsRef = useRef<any | null>(null);
    const actions = props.actions

    const {isActiveCameraAnimation,} = useAppSelector(state => state.storeStateReducer.events)
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
            autoRotate={!!actions?.ranges?.cameraRotation}
            autoRotateSpeed={actions ? actions.ranges.cameraRotation / 50 : 0}
            enablePan={false}
            minDistance={2.3}
            rotateSpeed={props.rotateSpeed ?
                mouseKey === 0 ? props.rotateSpeed[MouseButtonEnum.LEFT] : props.rotateSpeed[MouseButtonEnum.RIGHT]
                : 1}
            zoomSpeed={1}
            enableDamping={true}
            dampingFactor={0.45}
            {...props.control}
            mouseButtons={{
                LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.ROTATE, RIGHT: THREE.MOUSE.ROTATE
            }} ref={orbitControlsRef}/>
    );
};

export default OrbitControl;