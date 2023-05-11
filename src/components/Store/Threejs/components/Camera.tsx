import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {PerspectiveCamera} from "@react-three/drei";
import * as THREE from 'three'
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {storeStateSlice} from "../../../../reducers/slices/StoreStateSlice";
import {PerspectiveCameraProps} from "@react-three/fiber";
import {ICameraProperties} from "../../../../types/store/threejs/sceneTypes";

interface ICamera extends ICameraProperties {

}

const Camera: FC<ICamera> = ({...props}) => {
    const dispatch = useAppDispatch()
    const cameraRef = useRef<THREE.Camera>(null)
    const {activePlot, activePlanet} = useAppSelector(state => state.planetStateReducer)
    const {planets} = useAppSelector(state => state.planetStateReducer)
    const [plot, setPlot] = useState<{ center: THREE.Vector3, area: number } | null>(null);

    useEffect(() => {
        cameraRef.current?.lookAt(new THREE.Vector3(0, 0, 0))
    }, [props.angle, props.radius]);

    useEffect(() => {
        if (activePlanet?.id && activePlot?.id) {
            const plot = planets.find(planet => planet.id === activePlanet.id)!.plots!.find(plot => plot.id === activePlot.id)!
            setPlot({center: new THREE.Vector3(...plot?.mesh?.center!), area: plot?.area!})
        }
    }, [activePlot?.id])

    const [intervalState, setIntervalState] = useState<string | number | NodeJS.Timer | undefined>();
    const {isStopCameraAnimation, isRepeatCameraAnimation} = useAppSelector(state => state.storeStateReducer.events)

    useEffect(() => {
        !isRepeatCameraAnimation && dispatch(storeStateSlice.actions.setEvent({"isRepeatCameraAnimation": true}))
    }, [isRepeatCameraAnimation]);

    useEffect(() => {
        isStopCameraAnimation && clearInterval(intervalState)
        dispatch(storeStateSlice.actions.setEvent({"isStopCameraAnimation": false}))
    }, [isStopCameraAnimation]);

    useEffect(() => {
        if (cameraRef.current && plot && isRepeatCameraAnimation) {
            const currentRadius = cameraRef.current.position.length()
            const start = new THREE.Vector3(1, 1, 1).copy(cameraRef.current.position).normalize()
            const plotRadius = plot.area ** 0.05 * 4
            const finish = plot.center.normalize()
            const way = new THREE.Vector3(1, 1, 1).subVectors(finish, start)
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 2)

            if (props.enableAnimation && way.length() !== 3.188872858294072e-16) {
                dispatch(storeStateSlice.actions.setEvent({"isActiveCameraAnimation": true}))
                clearInterval(intervalState)
                const duration = 3000
                let [count, N] = [1, Math.floor(way.length() * duration / 10)]
                const stepsDelay = duration / N
                const interval = setInterval(() => {
                    const radius = (currentRadius - (currentRadius - plotRadius) * easeOutCubic(count / N))
                    const angle = new THREE.Vector3(1, 1, 1).copy(way)
                    const normalize = new THREE.Vector3(1, 1, 1).addVectors(angle.multiplyScalar(easeOutCubic(count / N)), start).normalize()
                    cameraRef.current && cameraRef.current.position.copy(normalize).multiplyScalar(radius)
                    count++
                    if (count === N + 1) {
                        clearInterval(interval)
                    }
                }, stepsDelay)
                setIntervalState(interval)
                dispatch(storeStateSlice.actions.setEvent({"isActiveCameraAnimation": false}))
            } else {
                cameraRef.current.position.copy(finish).multiplyScalar(plotRadius)
            }
        }
    }, [plot, isRepeatCameraAnimation]);

    const pos = useMemo(() => {
        return [0, Math.sin(props.angle * Math.PI / 180) * props.radius,
            Math.cos(props.angle * Math.PI / 180) * props.radius]
    }, [props.angle, props.radius]);

    return (
        <PerspectiveCamera ref={cameraRef}
                           position={pos as any} {...props}
                           makeDefault far={20000} near={0.1} fov={75}/>
    );
};

export default Camera;