import React, {FC, useEffect, useMemo} from 'react';
import {fetchPlanetsData} from "../../../../reducers/ActionCreator";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {IPlanet} from "../../../../types/store/threejs/planetObjectsTypes";
import {MeshBasicMaterialParameters, Object3D} from "three";
import {getContrastColor} from "../../../../helpers/store/threejs";
import Plot from "./Plot";
import {planetStateSlice} from "../../../../reducers/slices/PlanetStateSlice";
import {Html} from "@react-three/drei";
import UserHtml from "../Html/User/UserHtml";
import PlotHtml from "../Html/Plot/PlotHtml";
import {IPlotProperties} from "../../../../types/store/threejs/sceneTypes";
import {checkSoreFields, getPlanetData} from "../../../../helpers/asynch dispatch/planetObject";

interface ICombinePlot extends IPlotProperties {
    userControl?: boolean
    scale: number
    children?: React.ReactNode
    planetRef: React.RefObject<Object3D>
}


const CombinePlots: FC<ICombinePlot> = ({planetRef, userControl = true, scale, children, ...props}) => {
    const dispatch = useAppDispatch()
    const {planets, activePlanet} = useAppSelector(state => state.planetStateReducer)

    useEffect(() => {
        if (activePlanet?.id && activePlanet) {
            getPlanetData(dispatch, ['plots', 'color'], planets, activePlanet.id)
        }
    }, [activePlanet?.id]);

    const DEFAULT_MATERIAL = {opacity: 0}
    const defaultMaterial = useMemo<MeshBasicMaterialParameters>(() => {
        if (activePlanet?.color) {
            return {...DEFAULT_MATERIAL, color: getContrastColor(activePlanet?.color!)}
        }
        return DEFAULT_MATERIAL
    }, [activePlanet])
    const {activePlot} = useAppSelector(state => state.planetStateReducer)

    const {isUserSearch, isDashboard} = props.actions.buttons

    return (
        <group scale={props.radius}>
            {activePlanet?.plots?.map((plot, i) =>
                i === 50 &&
                <Plot scale={0} {...props} userControl={userControl} key={i} plot={plot}
                      defaultMaterial={defaultMaterial}>
                    {isDashboard &&
                        <Html as='div' center={true} position={plot?.mesh?.center!}
                              occlude={[planetRef]}
                              distanceFactor={5 * plot.area! ** 0.2}
                              className={'store-window-plot'}>
                            {plot.id === activePlot?.id && <PlotHtml/>}
                            {plot?.user && isUserSearch && plot.id !== activePlot?.id &&
                                <UserHtml style={{zIndex: 1000}} plot={plot}/>}
                        </Html>
                    }
                </Plot>
            )}
        </group>
    );
};

export default CombinePlots;