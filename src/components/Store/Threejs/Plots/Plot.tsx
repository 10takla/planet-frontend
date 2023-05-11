import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {MeshBasicMaterialParameters} from "three";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {storeStateSlice} from "../../../../reducers/slices/StoreStateSlice";
import {IPlot} from "../../../../types/store/threejs/planetObjectsTypes";
import {geometryToBuffer, getAnyColor} from "../../../../helpers/store/threejs";
import {ThreeEvent} from "@react-three/fiber";
import {planetStateSlice} from "../../../../reducers/slices/PlanetStateSlice";
import {HexColorString} from "three/src/utils";
import {IPlotProperties} from "../../../../types/store/threejs/sceneTypes";

interface IPlotComponent extends IPlotProperties {
    userControl?: boolean
    plot: IPlot
    children: React.ReactNode
    defaultMaterial: MeshBasicMaterialParameters
}

const Plot: FC<IPlotComponent> = ({userControl = true, plot, defaultMaterial, children, ...props}) => {
    const dispatch = useAppDispatch()
    const {activePlot} = useAppSelector(state => state.planetStateReducer)
    const {isGrid, isPlotGrid, isUserGrid, isUserSearch} = props.actions.buttons

    const [isHover, setHover] = useState<boolean>(false);

    const material = useMemo<MeshBasicMaterialParameters>(() => {
        let mat = {}
        if (isUserSearch && plot.user) {
            mat = {...mat, opacity: 0.4, color: getAnyColor(defaultMaterial.color as HexColorString, 270)}
        }
        if (isHover) {
            mat = {...mat, ...defaultMaterial, opacity: 0.4}
        }
        if (plot.id === activePlot?.id) {
            mat = {...mat, ...defaultMaterial, opacity: 0.8}
        }
        return {...defaultMaterial, ...mat}
    }, [isHover, activePlot, isUserSearch, defaultMaterial]);

    const [currX, setCurrX] = useState<number>(0);
    const [currY, setCurrY] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);
    const [isClamped, setIsClamped] = useState<boolean>(false);

    const handleMouseDown = useCallback((event: ThreeEvent<PointerEvent>) => {
        setIsClamped(true)
        setCurrX(event.clientX)
        setCurrY(event.clientY)
    }, [])

    const handleMouseUp = useCallback((event: ThreeEvent<PointerEvent>) => {
        setIsClamped(false)
        if (distance < 20) {
            dispatch(planetStateSlice.actions.setActivePlot(plot))
            dispatch(storeStateSlice.actions.setActivePlotId(plot.id))
        }
        setDistance(0)
    }, [])

    const handleMouseMove = useCallback((event: ThreeEvent<PointerEvent>) => {
        if (isClamped) {
            const [distanceX, distanceY] = [Math.abs(event.clientX - currX), Math.abs(event.clientY - currY)];
            setDistance(distance => distance + ((distanceX ** 2 + distanceY ** 2) ** 0.5))
            setCurrX(event.clientX)
            setCurrY(event.clientY)
        }
    }, [])


    const plotRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(null);

    // useEffect(() => {
    //     if (plotRef.current && plot.user) {
    //         const buffer = changeSphericalScale(plotRef.current.geometry, 0.7, plot.mesh?.center)
    //         plotRef.current.geometry = buffer
    //
    //     }
    // }, [isHover, activePlot, userSearch, defaultMaterial]);
    const geometry = useMemo(() => geometryToBuffer(plot.mesh, props.scale), [])
    return (
        <group>
            <mesh geometry={geometry} ref={plotRef}
                  onPointerOver={e => userControl && setHover(true)}
                  onPointerLeave={e => userControl && setHover(false)}
                  onPointerMove={handleMouseMove}
                  onPointerDown={handleMouseDown}
                  onPointerUp={handleMouseUp}
            >
                <meshBasicMaterial color={"green"}/>
                {/*<meshBasicMaterial transparent={true} {...material}/>*/}
                {(!isGrid &&
                        (
                            (isPlotGrid && (!isUserSearch || isUserSearch && ((isUserGrid && plot.user) || !plot.user)))
                            ||
                            (!isPlotGrid && isUserSearch && isUserGrid && plot.user)
                        )
                    ) &&
                    <mesh geometry={geometry}>
                        <meshBasicMaterial wireframe={true}/>
                    </mesh>
                }
                {children}
            </mesh>
            <points geometry={geometry}>
                <pointsMaterial size={0.05} color={0xffffff}/>
            </points>
        </group>
    );
};

export default Plot;