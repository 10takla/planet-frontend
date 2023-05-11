import React, {FC, MutableRefObject, useRef} from 'react';
import * as THREE from "three";
import {OrbitControls} from "@react-three/drei";
import {useAppSelector} from "../../../../hooks/redux";
import {IOrbitControl, ISceneProperties, MouseButton} from "../../../../types/store/threejs/sceneTypes";
import {IPlanetProperties} from "../../../../types/store/threejs/planetObjectsTypes";

interface IOrbitControlComponent extends IOrbitControl {
    mouseKey?: number | null;
}

const OrbitControl: FC<IOrbitControlComponent> = ({mouseKey, ...props}) => {
    const orbitControlsRef = useRef<any | null>(null);
    const actions = props.actions

    return (
        <OrbitControls
            onChange={e => {
                // console.log('2')
                // dispatch(storeStateSlice.actions.setEvent({"orbitRotation": true}))
            }}
            onEnd={e => {
                // dispatch(storeStateSlice.actions.setEvent({"orbitRotation": false}))
            }}
            autoRotate={!!actions.ranges.cameraRotation}
            autoRotateSpeed={actions.ranges.cameraRotation / 50}
            enablePan={false}
            minDistance={2.3}
            rotateSpeed={mouseKey === 0 ? props.rotateSpeed[MouseButton.LEFT] : props.rotateSpeed[MouseButton.RIGHT]}
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