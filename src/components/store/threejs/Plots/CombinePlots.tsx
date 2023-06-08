import React, {FC, useEffect} from 'react';
import {Object3D} from "three";
import Plot from "./Plot";
import {IPlanet} from "../../../../types/entities/planetType";
import {IPlotForStore} from "../../../../types/entities/plotType";
import {ISliceState} from "../../../../types/store/scene/sceneTypes";
import {useAppSelector} from "../../../../hooks/redux";
import {SlicePlanetSceneType} from "../../../../reducers/slices/scene/planetSceneSlice";
import {useGLTF} from "@react-three/drei";
import {SERVER_HOSTS} from "../../../../config";
import plot from "./Plot";

interface ICombinePlot {
    children?: React.ReactNode
    planetRef?: React.RefObject<Object3D>
    plots: IPlotForStore[]
    planet: IPlanet
    slice: SlicePlanetSceneType
}


const CombinePlots: FC<ICombinePlot> = ({slice, plots, planet, children}) => {
    const {activePlotId} = useAppSelector(state => state.planetStateReducer)
    const props = useAppSelector(state => state.planetSceneReducer[slice].scene.plots!)

    return (
        <group scale={props.radius}>
            {plots.map((plot, i) =>
                //@ts-ignore
                <Plot slice={slice} activePlotId={activePlotId} planet={planet} key={i} plot={plot}>

                </Plot>
            )}
        </group>
    );
};

export default CombinePlots;