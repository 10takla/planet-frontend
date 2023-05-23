import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {PerspectiveCamera} from "@react-three/drei";
import * as THREE from 'three'
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {storeStateSlice} from "../../../../reducers/slices/StoreStateSlice";
import {ICameraProperties} from "../../../../types/store/threejs/sceneTypes";
import {ICameraFocus} from "../../../../reducers/slices/PlanetStateSlice";

interface ICamera extends ICameraProperties {
    cameraFocus?: ICameraFocus
}

const Camera: FC<ICamera> = ({cameraFocus, ...props}) => {
    const dispatch = useAppDispatch()
    const cameraRef = useRef<THREE.Camera>(null)

    const [intervalState, setIntervalState] = useState<string | number | NodeJS.Timer | undefined>();
    const {
        isStopCameraAnimation,
        isActiveCameraAnimation,
        isRepeatCameraAnimation
    } = useAppSelector(state => state.storeStateReducer.events)

    useEffect(() => {
        if (props.enableAnimation && isStopCameraAnimation){
            clearInterval(intervalState)
            dispatch(storeStateSlice.actions.setEvent({"isStopCameraAnimation": false}))
        }
    }, [isStopCameraAnimation]);

    useEffect(() => {
        if (cameraRef.current && cameraFocus?.center) {
            const currentRadius = cameraRef.current.position.length()
            const plotRadius = cameraFocus.factorRange ** (props.factorPlotArea ?? 0.05) * ( props.plotFocusRadius ?? 0)
            const startPos = new THREE.Vector3(1, 1, 1).copy(cameraRef.current.position).normalize()
            const finishPos = new THREE.Vector3(...cameraFocus.center).normalize()
            const way = new THREE.Vector3(1, 1, 1).subVectors(finishPos, startPos)
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 2)
            if (props.enableAnimation && way.length() > 0.01) {
                const duration = 3000
                let [count, N] = [1, Math.floor(way.length() * duration / 10)]
                const stepsDelay = duration / N
                dispatch(storeStateSlice.actions.setEvent({"isActiveCameraAnimation": true}))
                const interval = setInterval(() => {
                    const radius = (currentRadius - (currentRadius - plotRadius) * easeOutCubic(count / N))
                    const angle = new THREE.Vector3(1, 1, 1).copy(way)
                    const normalize = new THREE.Vector3(1, 1, 1).addVectors(angle.multiplyScalar(easeOutCubic(count / N)), startPos).normalize()
                    cameraRef.current && cameraRef.current.position.copy(normalize).multiplyScalar(radius)
                    count++
                    if (count >= N + 1) {
                        dispatch(storeStateSlice.actions.setEvent({"isActiveCameraAnimation": false}))
                        clearInterval(interval)
                    }
                }, stepsDelay)
                setIntervalState(interval)
            } else {
                cameraRef.current.position.copy(finishPos).multiplyScalar(plotRadius)
            }
            cameraRef.current?.lookAt(new THREE.Vector3(0, 0, 0))
        }
    }, [cameraFocus]);

    const cameraFirstPos = useMemo<[number, number, number]>(() => {
        return [0, Math.sin(props.angle * Math.PI / 180) * props.radius,
            Math.cos(props.angle * Math.PI / 180) * props.radius]
    }, []);

    return (
        <PerspectiveCamera ref={cameraRef}
                           position={cameraFirstPos}
                           makeDefault far={20000} near={0.1} fov={75}
                           {...props}/>
    );
};

export default Camera;