import React, {MouseEvent, useCallback, useState, WheelEvent} from 'react';
import {Canvas} from "@react-three/fiber";
import {useAppDispatch} from "../../../hooks/redux";
import {storeStateSlice} from "../../../reducers/slices/StoreStateSlice";

const StoreWindow = () => {
    const dispatch = useAppDispatch()
    const [mouseKey, setMouseKey] = useState<number | null>(null);

    const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
        setMouseKey(event.button)
        dispatch(storeStateSlice.actions.setEvent({"isStopCameraAnimation": true}))
    }, [])

    const onCanvasWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
        dispatch(storeStateSlice.actions.setEvent({"isStopCameraAnimation": true}))
    }, []);


    return (
        <Canvas className="store-window"
                onMouseDown={handleMouseDown}
                onWheel={onCanvasWheel}
        >
            {/*<Stats/>*/}
            {/*<Environment {...sceneSettings.environment}/>*/}
            {/*<ambientLight color={0x404040} intensity={1}/>*/}
            {/*<directionalLight color={0xFFFFFF} intensity={1.2} position={[10, 0, 0]}/>*/}
            {/*<camera radius={6} angle={45}/>*/}
            {/*<OrbitControl {...sceneSettings.orbitControl} mouseKey={mouseKey}/>*/}
            {/*<CombinePlanet {...sceneSettings.planetProperties}/>*/}
        </Canvas>
    );
};

export default StoreWindow;