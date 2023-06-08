import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import * as THREE from "three";
import {MeshBasicMaterialParameters} from "three";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {geometryToBuffer, getAnyColor} from "../../../../helpers/store/threejs";
import {ThreeEvent} from "@react-three/fiber";
import {planetStateSlice} from "../../../../reducers/slices/scene/PlanetStateSlice";
import PlotHtml from "../Html/Plot/PlotHtml";
import HtmlPlot from "../Html/HtmlPlot";
import UserFocus from "../../../ui/userViews/UserFocus";
import {IPlot, IPlotForStore} from "../../../../types/entities/plotType";
import {IPlanet} from "../../../../types/entities/planetType";
import {planetSceneSlice, SlicePlanetSceneType} from "../../../../reducers/slices/scene/planetSceneSlice";
import {IPlotProperties} from "../../../../types/store/scene/properties/plotPropertieseTypes";

interface IPlotComponent {
    plot: IPlotForStore
    children?: React.ReactNode
    planet: IPlanet
    activePlotId: IPlot['id'] | null | undefined
    slice: SlicePlanetSceneType
    geo: any
}

const Plot: FC<IPlotComponent> = ({plot, geo, slice, activePlotId, planet, children}) => {
    const dispatch = useAppDispatch()
    const actions = useAppSelector(state => (
        {...state.planetSceneReducer[slice].actions.plots, ...state.planetSceneReducer[slice].actions.planet}
    ))
    const props = useAppSelector(state => state.planetSceneReducer[slice].scene.plots!)
    const {plotClick} = useAppSelector(state => state.planetSceneReducer[slice].events)
    const authUser = useAppSelector(state => state.userDataReducer.authUser)

    const plotRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(null);
    const [isHover, setHover] = useState<boolean>(false);
    const geometry = useMemo(() => {
            // return geo.geometry
            return geometryToBuffer(plot.mesh, props.scale)
        }
        ,
        [props.scale, plot])

    const center = useMemo(() => {
        return geometry.boundingBox!.getCenter(new THREE.Vector3()).normalize().toArray()
    }, [geometry]);

    const material = useMemo<MeshBasicMaterialParameters>(() => {
        const tmpMat = Object.entries(props.materials).reduce((accum, [key, value]) => {
            if (value.hasOwnProperty('offsetColor')) {
                // @ts-ignore
                value = {...value, color: getAnyColor(planet.color, value.offsetColor)}
            }

            return {...accum, [key]: value}
        }, {} as IPlotProperties['materials'])

        let mat: any = tmpMat.default
        if (actions.isUserPlots && plot.owner) {
            if (actions.isMyPlot && authUser && plot.owner.id === authUser?.id) {
                mat = {...mat, ...tmpMat.ownedByMe}
            } else {
                mat = {...mat, ...tmpMat.owned}
            }
        }
        if (actions.isNotSale && !plot.isSale) {
            mat = {...mat, ...tmpMat.isNotSale}
        }

        if (isHover) {
            mat = {...mat, ...tmpMat.default, ...tmpMat.hover}
        }

        if (plot.id === activePlotId) {
            mat = {...mat, ...tmpMat.default, ...tmpMat.active}
        }

        return mat
    }, [isHover, actions, activePlotId, planet, props?.materials, authUser]);

    const handleMouseDown = useCallback((event: ThreeEvent<PointerEvent>) => {
        dispatch(planetSceneSlice.actions.setEvent({data: {plotClick: {isClamped: true, distance: 0}}, slice: slice}))
    }, []);

    const handleMouseUp = useCallback((event: ThreeEvent<PointerEvent>) => {
        if (plotClick.isClamped) {
            if (plotClick.distance < 40 && event.button === props.events.selection.keyboard) {
                dispatch(planetStateSlice.actions.setActivePlotId(plot.id))
                dispatch(planetStateSlice.actions.setFocusPlotId(plot.id))
            }
            dispatch(planetSceneSlice.actions.setEvent({
                data: {plotClick: {isClamped: false, distance: 0}},
                slice: slice
            }))
        }
    }, [plotClick]);

    const {focusPlotId} = useAppSelector(state => state.planetStateReducer)

    useEffect(() => {
        if (plot.id === focusPlotId) {
            dispatch(planetSceneSlice.actions.setCameraFocus({
                data: {
                    center: center,
                    factorRange: plot.area
                }, slice: slice
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
                {(!actions.isGrid &&
                        (
                            (actions.isPlotGrid && (!actions.isUserPlots || actions.isUserPlots &&
                                ((actions.isUserGrid && plot.owner) || !plot.owner)))
                            ||
                            (!actions.isPlotGrid && actions.isUserPlots && actions.isUserGrid && plot.owner)
                        )
                    ) &&
                    <mesh geometry={geometry}>
                        <meshBasicMaterial wireframe={true}/>
                    </mesh>
                }
                {actions.isDashboard && ((plot.owner && actions.isUserPlots) || plot.id === activePlotId) &&
                    <React.Fragment>
                        {plot.id === activePlotId &&
                            <HtmlPlot position={center}>
                                <PlotHtml plot={plot}/>
                            </HtmlPlot>
                        }
                        {plot.owner
                            && actions.isDashboardUser && actions.isUserPlots && plot.id !== activePlotId
                            && authUser && authUser?.id !== plot.owner.id
                            &&
                            <HtmlPlot distanceFactor={5 * plot.area ** 0.2} position={center}>
                                <UserFocus user={plot.owner}/>
                            </HtmlPlot>
                        }
                    </React.Fragment>
                }
            </mesh>
        </group>
    );
};

export default Plot;