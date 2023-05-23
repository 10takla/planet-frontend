import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import * as THREE from "three";
import {MeshBasicMaterialParameters, MeshStandardMaterial} from "three";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {IPlanet, IPlot, IPlotForStore} from "../../../../types/store/threejs/planetObjectsTypes";
import {geometryToBuffer} from "../../../../helpers/store/threejs";
import {ThreeEvent} from "@react-three/fiber";
import {planetStateSlice} from "../../../../reducers/slices/PlanetStateSlice";
import {IPlotProperties, PlotMaterialType} from "../../../../types/store/threejs/sceneTypes";
import {storeStateSlice} from "../../../../reducers/slices/StoreStateSlice";
import PlotHtml from "../Html/Plot/PlotHtml";
import HtmlPlot from "../Html/HtmlPlot";
import UserFirstView from "../../../ui/userViews/UserFirstView";

interface IPlotComponent extends IPlotProperties {
    plot: IPlotForStore
    children?: React.ReactNode
    planet: IPlanet
    activePlotId: IPlot['id'] | null | undefined
}

const Plot: FC<IPlotComponent> = ({plot, activePlotId, planet, children, ...props}) => {
    const dispatch = useAppDispatch()
    const {isGrid, isPlotGrid, isUserGrid, isUserPlots,isMyPlot, isDashboard, isDashboardUser} = props.actions.buttons
    const plotRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(null);
    const {currentUser, authState} = useAppSelector(state => state.userDataReducer)
    const [isHover, setHover] = useState<boolean>(false);
    const geometry = useMemo(() => geometryToBuffer(plot.mesh, props.scale),
        [props.scale, plot])

    const center = useMemo(() => {
        return geometry.boundingBox!.getCenter(new THREE.Vector3()).normalize().toArray()
    }, [geometry]);

    const material = useMemo<MeshBasicMaterialParameters>(() => {
        const keysList = Object.keys(props.materials) as PlotMaterialType[]
        const materials = keysList.reduce((all, curr) => (
            {
                ...all,
                [curr]: props.materials[curr].getMaterial(planet.color)
            }
        ), {}) as { [key in PlotMaterialType]: MeshStandardMaterial }

        let mat: any = materials.default
        if (isUserPlots && plot.user) {
            if (isMyPlot &&  plot.user.id === currentUser?.id) {
                mat = {...mat, ...materials.isMeOwned}
            } else {
                mat = {...mat, ...materials.isOwned}
            }
        }

        if (isHover) {
            mat = {...mat, ...materials.default, ...materials.isHover}
        }

        if (plot.id === activePlotId) {
            mat = {...mat, ...materials.default, ...materials.isActive}
        }

        return mat
    }, [isHover, isUserPlots, isMyPlot, activePlotId, planet, props.materials, currentUser]);

    const {plotClick} = useAppSelector(state => state.storeStateReducer.events)


    const handleMouseDown = useCallback((event: ThreeEvent<PointerEvent>) => {
        dispatch(storeStateSlice.actions.setEvent({plotClick: {isClamped: true, distance: 0}}))
    }, []);

    const handleMouseUp = useCallback((event: ThreeEvent<PointerEvent>) => {
        if (plotClick.isClamped) {
            if (plotClick.distance < 40 && event.button === props.events.selection.keyboard) {
                dispatch(planetStateSlice.actions.setActivePlotId(plot.id))
                dispatch(planetStateSlice.actions.setFocusPlotId(plot.id))
            }
            dispatch(storeStateSlice.actions.setEvent({plotClick: {isClamped: false, distance: 0}}))
        }
    }, [plotClick]);

    const {focusPlotId} = useAppSelector(state => state.planetStateReducer)

    useEffect(() => {
        if (plot.id === focusPlotId) {
            dispatch(planetStateSlice.actions.setCameraFocus({
                center: center,
                factorRange: plot.area
            }))
        }
    }, [focusPlotId]);

    return (
        <group>
            <mesh geometry={geometry} ref={plotRef}
                  onPointerOver={e => setHover(true)}
                  onPointerLeave={e => setHover(false)}
                  onPointerDown={handleMouseDown}
                  onPointerUp={handleMouseUp}
            >
                <meshBasicMaterial transparent={true} {...material}/>
                {(!isGrid &&
                        (
                            (isPlotGrid && (!isUserPlots || isUserPlots && ((isUserGrid && plot.user) || !plot.user)))
                            ||
                            (!isPlotGrid && isUserPlots && isUserGrid && plot.user)
                        )
                    ) &&
                    <mesh geometry={geometry}>
                        <meshBasicMaterial wireframe={true}/>
                    </mesh>
                }
                {isDashboard && ((plot.user && isUserPlots) || plot.id === activePlotId) &&
                    <React.Fragment>
                        {plot.id === activePlotId &&
                            <HtmlPlot plot={plot} center={center} {...props}>
                                <PlotHtml/>
                            </HtmlPlot>
                        }
                        {plot.user && isDashboardUser && isUserPlots && plot.id !== activePlotId &&
                            <HtmlPlot plot={plot} center={center} {...props}>
                                <UserFirstView dispatch={dispatch} {...plot.user}/>
                            </HtmlPlot>
                        }
                    </React.Fragment>
                }
            </mesh>
        </group>
    );
};

export default Plot;