import React, {CSSProperties, FC, MouseEvent, useCallback, useState, WheelEvent} from 'react';
import Camera from "../../store/threejs/camera/Camera";
import OrbitControl from "../../store/threejs/components/OrbitControl";
import Environment from "../../store/threejs/components/Environment";
import {IPlanet} from "../../../types/store/threejs/planetObjectsTypes";
import Planet from "../../store/threejs/Planet/Planet";
import {Canvas} from "@react-three/fiber";
import {ISceneProperties} from "../../../types/store/threejs/sceneTypes";
import {storeStateSlice} from "../../../reducers/slices/StoreStateSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import CombinePlots from "../../store/threejs/Plots/CombinePlots";
import {ICameraFocus} from "../../../reducers/slices/PlanetStateSlice";

enum Fields {
    ENV = 'environment',
    LIGHT = 'light',
    OrbControl = 'orbitControl'
}

interface IPlanetScene extends ISceneProperties {
    fields?: Fields[]
    planet: IPlanet
    style?: CSSProperties
    cameraFocus?: ICameraFocus
}

const PlanetScene: FC<IPlanetScene> = ({fields, cameraFocus, planet, ...props}) => {
    const dispatch = useAppDispatch()
    const [mouseKey, setMouseKey] = useState<number | null>(null);
    const [curr, setCurr] = useState({x: 0, y: 0});
    const {plotClick, isActiveCameraAnimation} = useAppSelector(state => state.storeStateReducer.events)

    const onCanvasWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
        if (props.camera.enableAnimation && isActiveCameraAnimation) {
            dispatch(storeStateSlice.actions.setEvent({"isStopCameraAnimation": true}))
        }
    }, [isActiveCameraAnimation]);

    const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (props.camera.enableAnimation && isActiveCameraAnimation) {
            dispatch(storeStateSlice.actions.setEvent({"isStopCameraAnimation": true}))
        }
        setMouseKey(event.button)
        if (props.planetProperties.plotsProperties) {
            plotClick.isClamped && setCurr({x: event.clientX, y: event.clientY})
        }
    }, [curr, isActiveCameraAnimation])

    const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (props.planetProperties.plotsProperties) {
            if (plotClick.isClamped) {
                const [distanceX, distanceY] = [Math.abs(event.clientX - curr.x), Math.abs(event.clientY - curr.y)];
                const distance = plotClick.distance + ((distanceX ** 2 + distanceY ** 2) ** 0.5)
                setCurr({x: event.clientX, y: event.clientY})
                dispatch(storeStateSlice.actions.setEvent({plotClick: {isClamped: true, distance: distance}}))
            }
        }
    }, [curr, plotClick])

    return (
        <Canvas className="scene" style={props.style}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onWheel={onCanvasWheel}>
            {props.environment && <Environment {...props.environment}/>}
            {props.lights &&
                <React.Fragment>
                    <ambientLight color={0x404040} intensity={1}/>
                    <directionalLight color={0xFFFFFF} intensity={1.2} position={[10, 0, 0]}/>
                </React.Fragment>
            }
            {props.orbitControl &&
                <OrbitControl {...props.orbitControl} mouseKey={mouseKey}/>}
            <Camera cameraFocus={cameraFocus} {...props.camera}/>
            <Planet planet={planet} {...props.planetProperties}>
                {planet?.plots && props.planetProperties.plotsProperties && props.planetProperties.plotsProperties.actions.buttons.isPlots &&
                    <CombinePlots planet={planet} plots={planet.plots} {...props.planetProperties.plotsProperties}/>}
            </Planet>
        </Canvas>
    );
};

export default PlanetScene;