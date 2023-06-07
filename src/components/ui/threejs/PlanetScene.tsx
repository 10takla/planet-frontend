import React, {CSSProperties, FC, MouseEvent, useCallback, useState, WheelEvent} from 'react';
import Camera from "../../store/threejs/camera/Camera";
import OrbitControl from "../../store/threejs/components/OrbitControl";
import Environment from "../../store/threejs/components/Environment";
import Planet from "../../store/threejs/Planet/Planet";
import {Canvas} from "@react-three/fiber";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import CombinePlots from "../../store/threejs/Plots/CombinePlots";
import {IPlanet} from "../../../types/entities/planetType";
import {planetSceneSlice, SlicePlanetSceneType,} from "../../../reducers/slices/scene/planetSceneSlice";
import {Stats} from "@react-three/drei";

enum Fields {
    ENV = 'environment',
    LIGHT = 'light',
    OrbControl = 'orbitControl'
}

interface IPlanetScene {
    fields?: Fields[]
    planet: IPlanet
    style?: CSSProperties
    slice: SlicePlanetSceneType
}

const PlanetScene: FC<IPlanetScene> = ({slice, planet, style}) => {
    const dispatch = useAppDispatch()

    const {plotClick, isActiveCameraAnimation} = useAppSelector(state => state.planetSceneReducer[slice].events)
    const {scene, actions} = useAppSelector(state => state.planetSceneReducer[slice])
    const [mouseKey, setMouseKey] = useState<number | null>(null);
    const [curr, setCurr] = useState({x: 0, y: 0});

    const onCanvasWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
        if (scene.camera.enableAnimation && isActiveCameraAnimation) {
            dispatch(planetSceneSlice.actions.setEvent({slice: slice, data: {"isStopCameraAnimation": true}}))
        }
    }, [isActiveCameraAnimation]);

    const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (scene.camera.enableAnimation && isActiveCameraAnimation) {
            dispatch(planetSceneSlice.actions.setEvent({slice: slice, data: {"isStopCameraAnimation": true}}))
        }
        setMouseKey(event.button)
        if (scene.plots) {
            plotClick.isClamped && setCurr({x: event.clientX, y: event.clientY})
        }
    }, [curr, isActiveCameraAnimation])

    const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (scene.plots) {
            if (plotClick.isClamped) {
                const [distanceX, distanceY] = [Math.abs(event.clientX - curr.x), Math.abs(event.clientY - curr.y)];
                const distance = plotClick.distance + ((distanceX ** 2 + distanceY ** 2) ** 0.5)
                setCurr({x: event.clientX, y: event.clientY})
                dispatch(planetSceneSlice.actions.setEvent({
                    data: {
                        plotClick: {
                            isClamped: true,
                            distance: distance
                        }
                    }, slice: slice
                }))
            }
        }
    }, [curr, plotClick])

    return (
        <Canvas className="scene" style={style}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onWheel={onCanvasWheel}>
            {scene.environment && <Environment slice={slice}/>}
            {scene.lights &&
                <React.Fragment>
                    <ambientLight color={0x404040} intensity={1}/>
                    <directionalLight color={0xFFFFFF} intensity={1.2} position={[10, 0, 0]}/>
                </React.Fragment>
            }
            {scene.orbitControl &&
                <OrbitControl slice={slice} mouseKey={mouseKey}/>}
            <Camera slice={slice}/>
            {actions.planet.isPlanet && <Planet slice={slice} planet={planet}>
                {planet?.plots && scene.plots && actions.plots.isPlots &&
                    <CombinePlots slice={slice} planet={planet} plots={planet.plots}/>}
            </Planet>}
        </Canvas>
    );
};

export default PlanetScene;